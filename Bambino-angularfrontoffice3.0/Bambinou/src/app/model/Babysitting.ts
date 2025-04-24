import { User } from './User';
import { Baby } from './baby';
export interface Babysitting {
    idBabysitting?: number;
    startDate: Date;
    endDate: Date;
    duration: number;
    salary: number;
    status: string;
    babysitter?: any;
    userPatient?: any;

    // ✅ Ajoute cette ligne :
    babies?: Baby[];
  }
  