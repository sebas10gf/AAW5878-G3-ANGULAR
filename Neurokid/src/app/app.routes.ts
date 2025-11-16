import { Routes } from '@angular/router';
import { Usuarios } from './components/usuarios/usuarios';
import { Usuariosinsert } from './components/usuarios/usuariosinsert/usuariosinsert';
import { CuestionariosInsert } from './components/cuestionarios/cuestionarios-insert/cuestionarios-insert';
import { Cuestionarios } from './components/cuestionarios/cuestionarios';
import { Perfil } from './components/usuarios/perfil/perfil';
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

    {path:'Questions', component:Preguntas,
        children:[
            {path:'news',component:PreguntasInsert},
            {path:'edits/:id',component:PreguntasInsert}
        ]
    }
];
