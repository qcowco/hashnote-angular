import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WriteNoteComponent} from './component/write-note/write-note.component';
import {ViewNoteComponent} from './component/view-note/view-note.component';


const routes: Routes = [
  {path: '', component: WriteNoteComponent},
  {path: ':id', component: ViewNoteComponent},
  {path: ':id/:key', component: ViewNoteComponent},
  {path: '*', component: WriteNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
