import { Babysitting } from './Babysitting';

export interface Review {
  id?: number;
  rating: number;
  comment: string;
  babysitting: Babysitting;
  createdAt?: Date;
}
