import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {BookListComponent} from './book-list/book-list.component';
import {BookFormComponent} from './book-form/book-form.component';
import {LibraryOptionsResolver} from './resolver/library-options.resolver';
import {AuthorOptionsResolver} from './resolver/author-options.resolver';
import {BookResolver} from './resolver/book.resolver';
import {LenderListComponent} from './lender-list/lender-list.component';
import {LenderFormComponent} from './lender-form/lender-form.component';
import {LenderOptionsResolver} from './resolver/lender-options.resolver';
import {LenderResolver} from './resolver/lender.resolver';


const routes: Routes = [
  {path: '', redirectTo: 'book-list', pathMatch: 'full'},
  {path: 'book-list', component: BookListComponent, canActivate: [AuthGuard]},
  {path: 'lender-list', component: LenderListComponent, canActivate: [AuthGuard]},

  {
    path: 'book-form',
    component: BookFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      libraryOptions: LibraryOptionsResolver,
      authorOptions: AuthorOptionsResolver,
      lenderOptions: LenderOptionsResolver,
    }
  },
  {
    path: 'book-form/:id',
    component: BookFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      lenderOptions: LenderOptionsResolver,
      libraryOptions: LibraryOptionsResolver,
      authorOptions: AuthorOptionsResolver,
      book: BookResolver,
    }
  },
  {
    path: 'lender-form',
    component: LenderFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      libraryOptions: LibraryOptionsResolver,
      authorOptions: AuthorOptionsResolver,
    }
  },
  {
    path: 'lender-form/:id',
    component: LenderFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      libraryOptions: LibraryOptionsResolver,
      authorOptions: AuthorOptionsResolver,
      lender: LenderResolver,
    }
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
