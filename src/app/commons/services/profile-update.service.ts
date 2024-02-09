import { Injectable, inject } from '@angular/core';
import { GenericCRUDService } from './generic-crud.service';
import { IProfile } from '../models/profile.interface';
import { IDefaultResponse } from '../models/default-response.interface';
import { API_PATH } from 'src/app/constants/api-path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdate {
  private readonly genericCRUDService = inject(GenericCRUDService);

  update(profile: IProfile): Observable<IDefaultResponse> {
    return this.genericCRUDService
      .genericPost<IDefaultResponse, IProfile>(
        API_PATH.createProfile,
        profile
      );
  }
}
