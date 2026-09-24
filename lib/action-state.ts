export interface MeetingFormFieldValues {
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;
  openingPrayer: string;
  closingPrayer: string;
  openingHymnNumber: string;
  openingHymnTitle: string;
  sacramentHymnNumber: string;
  sacramentHymnTitle: string;
  closingHymnNumber: string;
  closingHymnTitle: string;
  announcements: string;
  wardBusiness: string;
  speakers: string;
  stakeBusiness: boolean;
}

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
  values?: MeetingFormFieldValues;
}
