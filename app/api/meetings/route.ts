import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const meetings = getMeetings(date);

  return Response.json(meetings);
}
