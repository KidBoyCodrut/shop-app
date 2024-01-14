import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from '../core/interceptors/errors-handler.interceptor';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true }],
  declarations: [LoginComponent]
})
export class LoginModule {}
