export interface Baby {
    idBaby?: number;
    name: string;
    dateOfBirth: Date | string;
    age: number;
    gender: string;
    medicalCondition: string;
    specialNeeds: string;
    favoriteActivities: string;
    emergencyContact: string;
    babysitting?:any;
    userPatient?: any
  }
  