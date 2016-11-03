import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GenericListComponent } from './generic/list/list.component';
import { GenericWriteComponent } from './generic/write/write.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/services/auth.guard';

const appRoutes: Routes = [

  // dedicated routes
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // 404
  { path: '404', component: NotFoundComponent },

  // generic 
  { path: ':model', component: GenericListComponent, canActivate: [AuthGuard] },
  { path: ':model/:id', component: GenericWriteComponent, canActivate: [AuthGuard] },

  // catchall
  { path: '**', redirectTo: '404' }
];

export const appRouting = RouterModule.forRoot(appRoutes);