import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

type DbHymn = {
  number?: number;
  title?: string;
};

type DbMeetingRow = {
  id: number;
  date: string;
  meetingType: SacramentMeeting['meetingType'];
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn?: DbHymn | null;
  openingPrayer?: string;
  wardBusiness?: SacramentMeeting['wardBusiness'];
  stakeBusiness?: boolean;
  sacramentHymn?: DbHymn | null;
  speakers?: SacramentMeeting['speakers'];
  closingHymn?: DbHymn | null;
  closingPrayer?: string;
};

function mapMeeting(row: DbMeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meetingType,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymnNumber: row.openingHymn?.number ?? 0,
    openingHymnTitle: row.openingHymn?.title ?? '',
    openingPrayer: row.openingPrayer ?? '',
    wardBusiness: row.wardBusiness ?? [],
    stakeBusiness: row.stakeBusiness ?? false,
    sacramentHymnNumber: row.sacramentHymn?.number ?? 0,
    sacramentHymnTitle: row.sacramentHymn?.title ?? '',
    speakers: row.speakers ?? [],
    closingHymnNumber: row.closingHymn?.number ?? 0,
    closingHymnTitle: row.closingHymn?.title ?? '',
    closingPrayer: row.closingPrayer ?? '',
  };
}

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return (rows as unknown as DbMeetingRow[]).map(mapMeeting);
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;

  if (!rows[0]) {
    return null;
  }

  return mapMeeting(rows[0] as unknown as DbMeetingRow);
}

export async function addMeeting(
  meeting: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    ) VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements || '{}'}::text[],
      ${JSON.stringify({
        number: meeting.openingHymnNumber || 0,
        title: meeting.openingHymnTitle || '',
      })}::jsonb,
      ${meeting.openingPrayer || ''},
      ${JSON.stringify(meeting.wardBusiness || [])}::jsonb,
      ${meeting.stakeBusiness || false},
      ${JSON.stringify({
        number: meeting.sacramentHymnNumber || 0,
        title: meeting.sacramentHymnTitle || '',
      })}::jsonb,
      ${JSON.stringify(meeting.speakers || [])}::jsonb,
      ${JSON.stringify({
        number: meeting.closingHymnNumber || 0,
        title: meeting.closingHymnTitle || '',
      })}::jsonb,
      ${meeting.closingPrayer || ''}
    )
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;

  return mapMeeting(rows[0] as unknown as DbMeetingRow);
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    UPDATE meetings
    SET
      date = ${updates.date},
      meeting_type = ${updates.meetingType},
      presiding = ${updates.presiding},
      conducting = ${updates.conducting},
      announcements = ${updates.announcements || []}::text[],
      opening_hymn = ${JSON.stringify({
        number: updates.openingHymnNumber || 0,
        title: updates.openingHymnTitle || '',
      })}::jsonb,
      opening_prayer = ${updates.openingPrayer || ''},
      ward_business = ${JSON.stringify(updates.wardBusiness || [])}::jsonb,
      stake_business = ${updates.stakeBusiness || false},
      sacrament_hymn = ${JSON.stringify({
        number: updates.sacramentHymnNumber || 0,
        title: updates.sacramentHymnTitle || '',
      })}::jsonb,
      speakers = ${JSON.stringify(updates.speakers || [])}::jsonb,
      closing_hymn = ${JSON.stringify({
        number: updates.closingHymnNumber || 0,
        title: updates.closingHymnTitle || '',
      })}::jsonb,
      closing_prayer = ${updates.closingPrayer || ''}
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;

  if (!rows[0]) {
    return null;
  }

  return mapMeeting(rows[0] as unknown as DbMeetingRow);
}

export async function deleteMeeting(id: number): Promise<boolean> {
  try {
    const rows = await sql`
      DELETE FROM meetings
      WHERE id = ${id}
      RETURNING id
    `;

    return rows.length > 0;
  }
   catch {
    return false;
  }

}