import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DateComponent} from './date/date.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LoginComponent} from './login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import {LogoutComponent} from './logout/logout.component';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {BookListComponent} from './book-list/book-list.component';
import {BookService} from './service/book.service';
import {BookFormComponent} from './book-form/book-form.component';
import { LenderFormComponent } from './lender-form/lender-form.component';
import { LenderListComponent } from './lender-list/lender-list.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    DateComponent,
    LoginComponent,
    LogoutComponent,
    LenderFormComponent,
    LenderListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSKOJGEKdNYe_Et8g3CC7rrJnPo6ff9qc'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
