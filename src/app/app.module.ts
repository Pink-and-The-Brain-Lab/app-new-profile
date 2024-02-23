import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewProfileModule } from './pages/new-profile/new-profile.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewProfileModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
			maxOpened: 10,
			preventDuplicates: true,
			progressBar: true
		}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
