import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {path: 'trivia' , loadChildren: () => import('./trivia/trivia.module').then(m => m.TriviaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
