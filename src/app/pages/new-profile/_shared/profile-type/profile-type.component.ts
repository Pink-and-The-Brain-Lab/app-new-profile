import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-type',
  templateUrl: './profile-type.component.html',
  styleUrls: ['./profile-type.component.scss']
})
export class ProfileTypeComponent {

  routeToNewProfile = '/new-profile/choose-email';
  routeToNewOrganization = '';
  private readonly router = inject(Router);

  navigateTo(route: string) {
    this.router.navigate([route])
  }

}
