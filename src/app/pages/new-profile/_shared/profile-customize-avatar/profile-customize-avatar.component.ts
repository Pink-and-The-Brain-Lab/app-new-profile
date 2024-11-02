import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CropperComponent, IImageUpload, IUpdateProfile, LocalStorageManager, ModalOverlayRef, ModalService, Storage, UpdateProfileAction, UpdateProfileState } from 'millez-web-components/dist/components';
import { Store } from '@ngxs/store';
import { HandleError } from 'src/app/commons/handle-error/handle-error';
import { GenericCRUDService } from 'src/app/commons/services/generic-crud.service';
import { API_PATH } from 'src/app/constants/api-path';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';

@Component({
  selector: 'app-profile-customize-avatar',
  templateUrl: './profile-customize-avatar.component.html',
  styleUrls: ['./profile-customize-avatar.component.scss']
})
export class ProfileCustomizeAvatarComponent extends HandleError implements OnDestroy {

  private destroy$ = new Subject<boolean>();
  private readonly localStorageManager = inject(LocalStorageManager);
  private readonly genericCRUDService = inject(GenericCRUDService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly modalService = inject(ModalService<string, CropperComponent>);
  color = '#7A87CC';
  image = {} as IImageUpload;
  imageFileBackup = {} as IImageUpload;

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  back() {
    this.router.navigate(['/new-profile/select-theme']);
  }

  next() {
    this.isLoading = true;
    const profile = this.store.selectSnapshot<IUpdateProfile>(UpdateProfileState.profile);
    const profileId = this.localStorageManager.get<string>(Storage.PROFILE_ID);
    const formData = new FormData();
    formData.append('image', this.image.file);
    formData.append('color', this.color);
    formData.append('id', profileId || '');
    const profileUpdated = {
      ...profile,
      image: this.image.blobUrl,
      color: this.color,
    };

    this.genericCRUDService
      .genericPost<IDefaultResponse, FormData>(
        API_PATH.updateProfile,
        formData,
      ).pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: _response => {
          this.store.dispatch( new UpdateProfileAction(profileUpdated) );
          this.router.navigate(['/new-profile/provide-chosen-name']);
        },
        error: _error => super.handleError(_error),
        complete: () => this.isLoading = false,
      });

  }

  showModal() {
    const modalRef = this.modalService.open({
        component: CropperComponent,
        title: 'Crop image',
        acceptButtonLabel: 'Save',
        declineButtonLabel: 'Cancel',
        data: this.image.blobUrl,
        clickOutsideToClose: false,
      });

    this.listenModalAccept(modalRef);
    this.listenModalDecline(modalRef);
  }

  private listenModalAccept(modalRef: ModalOverlayRef<string>) {
    modalRef.accepted.pipe(takeUntil(this.destroy$)).subscribe((response: string) => {
      this.imageFileBackup = this.image;
      this.image.blobUrl = response;
    });
  }

  private listenModalDecline(modalRef: ModalOverlayRef<string>) {
    modalRef.declined.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.image = this.imageFileBackup;
    });
  }

  imageLoaded(event: IImageUpload) {
    this.image = event;
    this.showModal();
  }
}
