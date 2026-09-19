import { neon } from '@neondatabase/serverless';

import type { Hymn, MeetingType, SacramentMeeting, SpeakerItem, WardBusinessItem } from './types';

export const ITEMS_PER_PAGE = 5;

function getSql() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Provision Neon on Vercel and run `vercel env pull .env.local`.');
  }

  return neon(connectionString);
}

function parseJson<T>(value: unknown, fallback: T): T {
  if (value == null) {
    return fallback;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }

  return value as T;
}

function toIsoDate(value: unknown): string {
  if (typeof value === 'string') {
    return value.slice(0, 10);
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, '0');
    const day = String(value.getUTCDate()).padStart(2, '0');
    const utcDate = `${year}-${month}-${day}`;

    // Neon DATE values can arrive as local midnight, which UTC conversion rolls back a day.
    if (value.getUTCHours() !== 0) {
      const localYear = value.getFullYear();
      const localMonth = String(value.getMonth() + 1).padStart(2, '0');
      const localDay = String(value.getDate()).padStart(2, '0');
      return `${localYear}-${localMonth}-${localDay}`;
    }

    return utcDate;
  }

  return String(value).slice(0, 10);
}

function mapMeeting(row: Record<string, unknown>): SacramentMeeting {
  return {
    id: Number(row.id),
    date: toIsoDate(row.iso_date ?? row.date),
    meetingType: String(row.meeting_type) as MeetingType,
    presiding: String(row.presiding),
    conducting: String(row.conducting),
    announcements: Array.isArray(row.announcements) ? (row.announcements as string[]) : [],
    openingHymn: parseJson<Hymn>(row.opening_hymn, { number: 0, title: '' }),
    openingPrayer: String(row.opening_prayer),
    wardBusiness: parseJson<WardBusinessItem[]>(row.ward_business, []),
    stakeBusiness: Boolean(row.stake_business),
    sacramentHymn: parseJson<Hymn>(row.sacrament_hymn, { number: 0, title: '' }),
    speakers: parseJson<SpeakerItem[]>(row.speakers, []),
    closingHymn: parseJson<Hymn>(row.closing_hymn, { number: 0, title: '' }),
    closingPrayer: String(row.closing_prayer),
  };
}

function currentSundayIsoDate(): string {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function getMeetings(date?: string | null): Promise<SacramentMeeting[]>;
export async function getMeetings(
  query: string,
  currentPage: number,
): Promise<{ meetings: SacramentMeeting[]; totalPages: number }>;
export async function getMeetings(
  dateOrQuery?: string | null,
  currentPage?: number,
): Promise<SacramentMeeting[] | { meetings: SacramentMeeting[]; totalPages: number }> {
  const sql = getSql();

  if (typeof currentPage === 'number') {
    const query = dateOrQuery ?? '';
    const search = `%${query}%`;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
      SELECT *, to_char(date, 'YYYY-MM-DD') AS iso_date
      FROM meetings
      WHERE
        presiding ILIKE ${search}
        OR conducting ILIKE ${search}
        OR meeting_type ILIKE ${search}
        OR speakers::text ILIKE ${search}
      ORDER BY meetings.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const countRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM meetings
      WHERE
        presiding ILIKE ${search}
        OR conducting ILIKE ${search}
        OR meeting_type ILIKE ${search}
        OR speakers::text ILIKE ${search}
    `;

    const total = Number(countRows[0]?.count ?? 0);

    return {
      meetings: rows.map((row) => mapMeeting(row as Record<string, unknown>)),
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    };
  }

  if (dateOrQuery) {
    const rows = await sql`
      SELECT *, to_char(date, 'YYYY-MM-DD') AS iso_date
      FROM meetings
      WHERE meetings.date = ${dateOrQuery}
      ORDER BY meetings.date DESC
    `;

    return rows.map((row) => mapMeeting(row as Record<string, unknown>));
  }

  const rows = await sql`
    SELECT *, to_char(date, 'YYYY-MM-DD') AS iso_date
    FROM meetings
    ORDER BY meetings.date DESC
  `;

  return rows.map((row) => mapMeeting(row as Record<string, unknown>));
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT *, to_char(date, 'YYYY-MM-DD') AS iso_date
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return mapMeeting(rows[0] as Record<string, unknown>);
}

export async function addMeeting(meeting: SacramentMeeting): Promise<SacramentMeeting[]> {
  void meeting;
  throw new Error('addMeeting will be implemented in Week 04.');
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  void id;
  void updates;
  throw new Error('updateMeeting will be implemented in Week 04.');
}

export async function deleteMeeting(id: number): Promise<boolean> {
  void id;
  throw new Error('deleteMeeting will be implemented in Week 04.');
}

export async function getCurrentSundayMeeting(): Promise<SacramentMeeting | null> {
  const meetings = await getMeetings(currentSundayIsoDate());
  return meetings[0] ?? null;
}
