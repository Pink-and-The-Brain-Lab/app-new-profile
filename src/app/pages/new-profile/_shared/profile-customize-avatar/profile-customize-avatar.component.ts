import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CropperComponent, ModalOverlayRef, ModalService } from 'millez-components-lib/components';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';

@Component({
  selector: 'app-profile-customize-avatar',
  templateUrl: './profile-customize-avatar.component.html',
  styleUrls: ['./profile-customize-avatar.component.scss']
})
export class ProfileCustomizeAvatarComponent implements OnDestroy {

  private destroy$ = new Subject<boolean>();
  color = '#7A87CC';
  imageFile = '';
  imageFileBackup = '';

  constructor(
    private router: Router,
    private modalService: ModalService<string, CropperComponent>,
    private store: Store
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  back() {
    this.router.navigate(['/new-profile/phone-number-validation']);
  }

  next() {
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      image: this.imageFile,
      color: this.color,
    };
    this.store.dispatch( new UpdateProfileAction(profileUpdated) );
    this.router.navigate(['/new-profile/provide-chosen-name']);
  }

  showModal() {
    const modalRef = this.modalService.open({
        component: CropperComponent,
        title: 'Crop image',
        acceptButtonLabel: 'Save',
        declineButtonLabel: 'Cancel',
        data: this.imageFile,
        clickOutsideToClose: false,
      });

    this.listenModalAccept(modalRef);
    this.listenModalDecline(modalRef);
  }

  private listenModalAccept(modalRef: ModalOverlayRef<string>) {
    modalRef.accepted.pipe(takeUntil(this.destroy$)).subscribe((response: string) => {
      this.imageFileBackup = this.imageFile;
      this.imageFile = response;
    });
  }

  private listenModalDecline(modalRef: ModalOverlayRef<string>) {
    modalRef.declined.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.imageFile = this.imageFileBackup;
    });
  }

  imageLoaded(event: string) {
    this.imageFile = event;
    this.showModal();
  }

  

}
