import { Routes } from '@angular/router';
import { Usuarios } from './components/usuarios/usuarios';
import { Usuariosinsert } from './components/usuarios/usuariosinsert/usuariosinsert';
import { CuestionariosInsert } from './components/cuestionarios/cuestionarios-insert/cuestionarios-insert';
import { Cuestionarios } from './components/cuestionarios/cuestionarios';
import { Perfil } from './components/usuarios/perfil/perfil';
import { Roles } from './components/roles/roles';
import { Roleslinsert } from './components/roles/roleslinsert/roleslinsert';
import { Goals } from './components/goals/goals';
import { Goalinsert } from './components/goals/goalinsert/goalinsert';
import { Symptomslogs } from './components/symptomslogs/symptomslogs';
import { Symptomsloginsert } from './components/symptomslogs/symptomsloginsert/symptomsloginsert';
import { Preguntas } from './components/preguntas/preguntas';
import { PreguntasInsert } from './components/preguntas/preguntas-insert/preguntas-insert';

export const routes: Routes = [
    {path:'Users', component:Usuarios,
        children:[
            {path:'news',component:Usuariosinsert},
            {path:'edits/:id',component:Usuariosinsert},
            {path:'usuario/:id',component:Perfil}
        ]
    },

    {path:'Questionnaries', component:Cuestionarios,
        children:[
            {path:'news',component:CuestionariosInsert},
            {path:'edits/:id',component:CuestionariosInsert}
        ]
    },

     {path:'Roles', component:Roles,
        children:[
            {path:'news',component:Roleslinsert},
            {path:'edits/:id',component:Roleslinsert}
        ]
    },

    {path:'Goal', component:Goals,
        children:[
            {path:'news',component:Goalinsert},
            {path:'edits/:id',component:Goalinsert}
        ]
    },

     {path:'SymptomsLog', component:Symptomslogs,
        children:[
            {path:'news',component:Symptomsloginsert},
            {path:'edits/:id',component:Symptomsloginsert}
        ]
    },

    {path:'Questions', component:Preguntas,
        children:[
            {path:'news',component:PreguntasInsert},
            {path:'edits/:id',component:PreguntasInsert}
        ]
    },
];
