import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PrincipalComponent } from './principal/principal.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ConsejosComponent } from './consejos/consejos.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: PrincipalComponent},
  { path: 'Categoria', component: CategoriasComponent},
  {path: 'Nosotros', component: NosotrosComponent},
  {path: 'Consejos', component:ConsejosComponent},
  {path: 'productos',component:ProductosComponent},
  {path:'Carrito',component:CarritoComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
