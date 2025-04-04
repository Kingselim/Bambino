// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private expertId: number = 1;

  setExpertId(id: number) {
    this.expertId = id;
  }

  getExpertId(): number {
    return this.expertId;
  }
}
