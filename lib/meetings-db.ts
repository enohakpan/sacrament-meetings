import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-13',
    meetingType: 'regular',
    presiding: 'Bishop Akpoviwhroro',
    conducting: 'Brother Enoh',
    announcements: ['Youth conference volunteers needed by Friday', 'Temple recommend interviews on Saturday'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Aniebiet',
    wardBusiness: [
      { description: 'Sustaining of new Relief Society president' },
      { description: 'Thanksgiving dinner service schedule announced' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 170, title: 'God, Our Father, Hear Us Pray' },
    speakers: [
      { name: 'Brother Chibuzor', topic: 'The Blessings of Covenant Living', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' },
      { name: 'Brother Harrison', topic: 'Keeping Faith Through Change', type: 'speaker' },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Thompson',
  },
  {
    id: 2,
    date: '2026-09-06',
    meetingType: 'testimony',
    presiding: 'President Lewis',
    conducting: 'Brother Hughes',
    openingHymn: { number: 144, title: 'Faith of Our Fathers' },
    openingPrayer: 'Brother Foster',
    wardBusiness: [{ description: 'Fast offering donations and family history class signups' }],
    stakeBusiness: true,
    sacramentHymn: { number: 191, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Sister Clark', topic: 'Simple Acts of Service', type: 'speaker' },
      { name: 'Brother Ramirez', topic: 'Testimony of the Savior', type: 'speaker' },
    ],
    closingHymn: { number: 116, title: 'Come, Come, Ye Saints' },
    closingPrayer: 'Sister Price',
  },
  {
    id: 3,
    date: '2026-08-30',
    meetingType: 'regular',
    presiding: 'Bishop Akpoviwhroro',
    conducting: 'Brother Watson',
    announcements: ['Ward mission leader updates', 'Primary activity on Saturday'],
    openingHymn: { number: 109, title: 'How Great Thou Art' },
    openingPrayer: 'Brother Garcia',
    wardBusiness: [
      { description: 'Ward budget review and service committee assignments' },
      { description: 'New nursery schedule shared' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'Where Can I Turn for Peace?' },
    speakers: [
      { name: 'Sister Kim', topic: 'Finding Peace in Christ', type: 'speaker' },
      { name: 'Youth Quartet', topic: '', type: 'musical-number' },
    ],
    closingHymn: { number: 85, title: 'Be Still, My Soul' },
    closingPrayer: 'Brother Patel',
  },
  {
    id: 4,
    date: '2026-08-23',
    meetingType: 'stake',
    presiding: 'Stake President Hill',
    conducting: 'Brother Ross',
    openingHymn: { number: 152, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Reed',
    wardBusiness: [{ description: 'Stake temple district announcement and leadership training' }],
    stakeBusiness: true,
    sacramentHymn: { number: 161, title: 'I Know That My Redeemer Lives' },
    speakers: [
      { name: 'Brother Jenkins', topic: 'Living the Gospel Daily', type: 'speaker' },
      { name: 'Stake Choir', topic: '', type: 'musical-number' },
      { name: 'Sister Moore', topic: 'The Joy of Ministering', type: 'speaker' },
    ],
    closingHymn: { number: 67, title: 'Master, the Tempest Is Raging' },
    closingPrayer: 'Brother Diaz',
  },
  {
    id: 5,
    date: '2026-08-16',
    meetingType: 'general',
    presiding: 'Elder Sanders',
    conducting: 'Brother Walker',
    announcements: ['General conference watch party schedule', 'Missionary opportunities in the neighborhood'],
    openingHymn: { number: 58, title: 'Guide Us, O Thou Great Jehovah' },
    openingPrayer: 'Sister Hurst',
    wardBusiness: [
      { description: 'Welcome to new families in the ward' },
      { description: 'Youth temple trip signups open' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 140, title: 'I Need Thee Every Hour' },
    speakers: [
      { name: 'Brother Coleman', topic: 'Trusting the Lord in Our Trials', type: 'speaker' },
      { name: 'Sister Ortiz', topic: 'The Power of Prayer', type: 'speaker' },
    ],
    closingHymn: { number: 120, title: 'Praise to the Man' },
    closingPrayer: 'Brother Morris',
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return [...meetings];
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}

export function addMeeting(meeting: SacramentMeeting): SacramentMeeting[] {
  meetings.push(meeting);
  return [...meetings];
}

export function updateMeeting(id: number, updates: Partial<SacramentMeeting>): SacramentMeeting | null {
  const meetingIndex = meetings.findIndex((meeting) => meeting.id === id);

  if (meetingIndex === -1) {
    return null;
  }

  meetings[meetingIndex] = {
    ...meetings[meetingIndex],
    ...updates,
  };

  return meetings[meetingIndex];
}

export function deleteMeeting(id: number): boolean {
  const originalLength = meetings.length;
  const filteredMeetings = meetings.filter((meeting) => meeting.id !== id);

  if (filteredMeetings.length === originalLength) {
    return false;
  }

  meetings.splice(0, meetings.length, ...filteredMeetings);
  return true;
}

export function getCurrentSundayMeeting(): SacramentMeeting | null {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const isoDate = sunday.toISOString().slice(0, 10);
  return getMeetings(isoDate)[0] ?? null;
}
