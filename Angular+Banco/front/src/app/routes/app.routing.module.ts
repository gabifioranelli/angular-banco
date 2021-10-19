import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CadastrarAlunoRoutes } from '../cadastrar-alunos';
import { EditarAlunoRoutes } from '../editar-alunos';
import { ListarAlunoRoutes } from '../listar-alunos';

const routes: Routes = [
    {
        path:'',
        redirectTo: '/alunos',
        pathMatch:'full'
    },
    ...ListarAlunoRoutes,
    ...CadastrarAlunoRoutes,
    ...EditarAlunoRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
    
}

