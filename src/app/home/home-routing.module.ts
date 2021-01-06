import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiComponentComponent } from '../ai-component/ai-component.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path:'computer',
    component:AiComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
