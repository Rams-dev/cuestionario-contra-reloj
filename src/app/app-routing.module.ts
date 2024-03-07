import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { RankingComponent } from './ranking/ranking.component';


const routes: Routes = [
  {
    path:'',
    component: MenuComponent
  },
  {
    path:'startQuestions/:pregunta',
    component: QuestionsComponent
  },
  {
    path:'resultado',
    component: ResultadoComponent
  },
  {
    path:'ranking',
    component: RankingComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
