import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewProfileModule } from './pages/new-profile/new-profile.module';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewProfileModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
