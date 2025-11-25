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
import { Respuestas } from './components/respuestas/respuestas';
import { RespuestasInsert } from './components/respuestas/respuestas-insert/respuestas-insert';
import { Predicciones } from './components/predicciones/predicciones';
import { PrediccionesInsert } from './components/predicciones/predicciones-insert/predicciones-insert';
import { Autenticador } from './components/autenticador/autenticador';
import { seguridadGuardGuard } from './guard/seguridad-guard-guard';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },

    {
        path: 'login',
        component: Autenticador,
    },

    {path:'Users', component:Usuarios,
        children:[
            {path:'news',component:Usuariosinsert},
            {path:'edits/:id',component:Usuariosinsert},
            {path:'usuario/:id',component:Perfil}
        ],
        canActivate: [seguridadGuardGuard],
    },

    {path:'Questionnaries', component:Cuestionarios,
        children:[
            {path:'news',component:CuestionariosInsert},
            {path:'edits/:id',component:CuestionariosInsert}
        ],
        canActivate: [seguridadGuardGuard],
    },

     {path:'Roles', component:Roles,
        children:[
            {path:'news',component:Roleslinsert},
            {path:'edits/:id',component:Roleslinsert}
        ],
        canActivate: [seguridadGuardGuard],
    },

    {path:'Goal', component:Goals,
        children:[
            {path:'news',component:Goalinsert},
            {path:'edits/:id',component:Goalinsert}
        ],
        canActivate: [seguridadGuardGuard],
    },

     {path:'SymptomsLog', component:Symptomslogs,
        children:[
            {path:'news',component:Symptomsloginsert},
            {path:'edits/:id',component:Symptomsloginsert}
        ],
        canActivate: [seguridadGuardGuard],
    },

    {path:'Questions', component:Preguntas,
        children:[
            {path:'news',component:PreguntasInsert},
            {path:'edits/:id',component:PreguntasInsert}
        ],
        canActivate: [seguridadGuardGuard],
    },

    {path:'QuestionsAnswers', component:Respuestas,
        children:[
            {path:'news',component:RespuestasInsert},
            {path:'edits/:id',component:RespuestasInsert}
        ],
        canActivate: [seguridadGuardGuard],
    },

    {path:'Prediction', component:Predicciones,
        children:[
            {path:'news',component:PrediccionesInsert},
            {path:'edits/:id',component:PrediccionesInsert}
        ],
        canActivate: [seguridadGuardGuard],
    },
    {
        path: 'homes',
        component: Home,
        canActivate: [seguridadGuardGuard],
    },
];
