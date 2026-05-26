export interface UserProfile {
  teachSkill: string;
  learnSkill: string;
  birthdate: string;
  showFace: boolean;
  timeOfExperience: string; // custom text box
  country: string; // searchable country
  avatar: string; // emoji or image path chosen
}

export interface UserAccount {
  email: string;
  username: string;
  displayName: string;
  avatar: string; // chosen pfp emoji or image URL
  profile?: UserProfile;
}
