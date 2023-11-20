import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-type',
  templateUrl: './profile-type.component.html',
  styleUrls: ['./profile-type.component.scss']
})
export class ProfileTypeComponent {

  routeToNewProfile = '/new-profile/choose-email';
  routeToNewOrganization = '';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route])
  }

}
