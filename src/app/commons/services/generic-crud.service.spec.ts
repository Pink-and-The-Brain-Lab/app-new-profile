import { TestBed, fakeAsync } from '@angular/core/testing';
import { GenericCRUDService } from './generic-crud.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IDefaultResponse } from '../models/default-response.interface';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GenericCRUDService', () => {
  let service: GenericCRUDService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        GenericCRUDService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
});
    service = TestBed.inject(GenericCRUDService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post method', fakeAsync(() => {
    const responseMock: IDefaultResponse = { success: true, profileId: '1234566' };
    service.genericPost(`${API_PATH.checkEmailDisponibility}`).subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.checkEmailDisponibility}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
