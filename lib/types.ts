export type MeetingType = 'testimony' | 'regular' | 'stake' | 'general';

export interface SpeakerItem {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
}

export interface WardBusinessItem {
  description: string;
}

export interface SacramentMeeting {
  id: number;
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymnNumber?: number;
  openingHymnTitle?: string;
  openingPrayer?: string;
  wardBusiness?: WardBusinessItem[];
  stakeBusiness?: boolean;
  sacramentHymnNumber?: number;
  sacramentHymnTitle?: string;
  speakers?: SpeakerItem[];
  closingHymnNumber?: number;
  closingHymnTitle?: string;
  closingPrayer?: string;
}