import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IDefaultResponse } from '../models/default-response.interface';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';
import { ProfileUpdate } from './profile-update.service';

describe('ProfileUpdate', () => {
  let service: ProfileUpdate;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProfileUpdate,
      ]
    });
    service = TestBed.inject(ProfileUpdate);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update profile', fakeAsync(() => {
    const responseMock: IDefaultResponse = { success: true, profileId: '1234566' };
    service.update({}).subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.updateProfile}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
