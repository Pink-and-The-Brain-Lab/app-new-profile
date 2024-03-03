import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { DashboardVisualizationControlAction, ILanguageChange, LanguageChangeState } from 'millez-web-components/dist/components';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.scss']
})
export class NewProfileComponent {
  
  @Select(LanguageChangeState) language$!: Observable<ILanguageChange>;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);

  constructor() {
    this.store.dispatch( new DashboardVisualizationControlAction({ showDashboard: false }) );
    this.language$.subscribe(response => this.translateService.use(response.language));
  }

  close() {
    this.store.dispatch( new DashboardVisualizationControlAction({ showDashboard: true }) );
    this.router.navigate(['/']);
  }

}
