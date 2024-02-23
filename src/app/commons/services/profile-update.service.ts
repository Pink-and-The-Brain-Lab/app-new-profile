import { Injectable, inject } from '@angular/core';
import { GenericCRUDService } from './generic-crud.service';
import { IProfile } from '../models/profile.interface';
import { IDefaultResponse } from '../models/default-response.interface';
import { API_PATH } from 'src/app/constants/api-path';
import { Observable } from 'rxjs';
import { LocalStorageManager, Storage } from 'millez-web-components/dist/components';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdate {
  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly localStorageManager = inject(LocalStorageManager);

  update(profile: IProfile): Observable<IDefaultResponse> {
    const profileId = this.localStorageManager.get<string>(Storage.PROFILE_ID);
    const data = {
      ...profile,
      id: profileId || undefined
    };
    return this.genericCRUDService
      .genericPost<IDefaultResponse, IProfile>(
        API_PATH.updateProfile,
        data,
      );
  }
}
