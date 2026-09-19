import { NextResponse } from 'next/server';

import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: 'Meeting ID must be a valid number.' }, { status: 400 });
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found.' }, { status: 404 });
  }

  return NextResponse.json(meeting);
}
