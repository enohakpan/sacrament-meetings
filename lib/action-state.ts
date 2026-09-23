export interface MeetingActionState {
  message: string;
  errors: Partial<
    Record<
      | 'date'
      | 'meetingType'
      | 'presiding'
      | 'conducting'
      | 'openingPrayer'
      | 'closingPrayer'
      | 'openingHymnNumber'
      | 'openingHymnTitle'
      | 'sacramentHymnNumber'
      | 'sacramentHymnTitle'
      | 'closingHymnNumber'
      | 'closingHymnTitle'
      | 'announcements'
      | 'wardBusiness'
      | 'speakers'
      | 'stakeBusiness',
      string[]
    >
  >;
}
