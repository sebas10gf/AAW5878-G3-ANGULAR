import { Routes } from '@angular/router';
import { Usuarios } from './components/usuarios/usuarios';
import { Usuariosinsert } from './components/usuarios/usuariosinsert/usuariosinsert';

export const routes: Routes = [
    {path:'Users', component:Usuarios,
        children:[
            {path:'news',component:Usuariosinsert},
            {path:'edits/:id',component:Usuariosinsert}
        ]
    }
];
