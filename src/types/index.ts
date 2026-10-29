export type UserRole = 'expert' | 'org' | null;

export interface AlgerianWilaya {
  code: string;
  name: string;
  arabicName: string;
  region: 'North-Central' | 'North-West' | 'North-East' | 'High Plateaus' | 'South';
  universities: string[];
  lat: number;
  lng: number;
  xPercent: number; // coordinate percentage within Algeria map projection
  yPercent: number;
}

export interface DiasporaHub {
  id: string;
  name: string;
  country: string;
  institution: string;
  lat: number;
  lng: number;
  x: number; // world map projection percentage (0 to 100)
  y: number;
}

export interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  currentAffiliation: string;
  country: string;
  city: string;
  wilayaOrigin: string;
  preferredWilayas: string[];
  domain: string;
  bio: string;
  avatarUrl: string;
  visitWindow: string;
  availableForTalks: boolean;
  availableForCollab: boolean;
  availableForMentorship: boolean;
  talkTopics: string[];
  publicationCount: number;
  citationCount: number;
}

export interface UniversityProject {
  id: string;
  title: string;
  organizationName: string;
  wilayaCode: string;
  wilayaName: string;
  domain: string;
  type: 'PhD Co-supervision' | 'Industrial R&D' | 'Academic Curriculum' | 'Visiting Keynote' | 'Tech Transfer';
  description: string;
  objectives: string[];
  deadline: string;
  urgency: 'Active' | 'Urgent' | 'Under Review';
  contactPerson: string;
}

export interface ConnectionEvent {
  id: string;
  fromHub: DiasporaHub;
  toWilaya: AlgerianWilaya;
  expertName: string;
  domain: string;
  timestamp: number;
}
