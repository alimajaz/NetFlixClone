import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { authGuard } from './shared/Guard/auth.guard';
import { MoviepageComponent } from './pages/moviepage/moviepage.component';

export const routes: Routes = [
    // {
    //     path:'',loadComponent:()=>import('./pages/login/login.component').then(a=>a.LoginComponent)
    // },
    // {
    //     path:'browse',loadComponent:()=>import('./pages/browse/browse.component').then(a=>a.BrowseComponent)
    // },
    // {
    //     path:'**', component:NotfoundComponent
    // },
    {path:'', component:LoginComponent,  canActivate:[authGuard]},
    { path: 'browse', component: BrowseComponent, canActivate:[authGuard]},
    {path:'login',component:LoginComponent},
    {path:'movies', component:MoviepageComponent},
    {path:'**', component:NotfoundComponent}
   
];
