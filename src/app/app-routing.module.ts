import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'checklists', pathMatch: 'full' },
  { path: 'checklists', loadChildren: './home/home.module#HomePageModule' },
  { path: 'checklists/:id', loadChildren: './checklist/checklist.module#ChecklistPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
