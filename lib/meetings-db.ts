import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Sister Williams',
    openingHymn: { number: 105, title: 'Testimony' },
    openingPrayer: 'Brother Taylor',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Elder Johnson', topic: 'Repentance', type: 'speaker' },
      { name: 'Sister Lee', topic: 'Prayer', type: 'speaker' }
    ],
    closingHymn: { number: 136, title: 'How Great Thou Art' },
    closingPrayer: 'Sister Brown'
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'stake',
    presiding: 'Stake President Johnson',
    conducting: 'Bishop Smith',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Elder Davis',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Stake President Johnson', topic: 'Temple Work', type: 'speaker' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Bishop Smith'
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'general',
    presiding: 'First Presidency',
    conducting: 'President Nelson',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Elder Cook',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'President Nelson', topic: 'Revelation', type: 'speaker' },
      { name: 'President Oaks', topic: 'Truth', type: 'speaker' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Elder Holland'
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 56, title: 'Now Thank We All Our God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Ward council nominations' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Brother Taylor', topic: 'Service', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}