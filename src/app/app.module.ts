import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewProfileModule } from './pages/new-profile/new-profile.module';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiRequestsInterceptorInterceptor } from './api-requests-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewProfileModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([]),
    ToastrModule.forRoot({
			maxOpened: 10,
			preventDuplicates: true,
			progressBar: true
		}),
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: ApiRequestsInterceptorInterceptor, multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
