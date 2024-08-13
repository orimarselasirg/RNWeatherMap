export interface User {
    givenName:    string;
    familyName:   string;
    nickname:     string;
    name:         string;
    picture:      string;
    updatedAt:    string;
    email:        string;
    emailVerified:boolean;
    sub:          string;
    is_active?:   number;
  }