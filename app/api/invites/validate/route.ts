import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { valid: false, message: 'Invite code required' },
        { status: 400 }
      );
    }

    const result = await query(
      `
      SELECT
          code,
          uses_remaining,
          expires_at,
          is_founding_invite,
          beta_cohort
      FROM invite_codes
      WHERE code = $1
      `,
      [code.trim()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({
        valid: false,
        message: 'Invalid invite code',
      });
    }

    const invite = result.rows[0];

    if (invite.uses_remaining <= 0) {
      return NextResponse.json({
        valid: false,
        message: 'Invite code already used',
      });
    }

    if (
      invite.expires_at &&
      new Date(invite.expires_at) < new Date()
    ) {
      return NextResponse.json({
        valid: false,
        message: 'Invite code expired',
      });
    }

    return NextResponse.json({
      valid: true,
      foundingMember: invite.is_founding_invite,
      betaCohort: invite.beta_cohort,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        valid: false,
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}