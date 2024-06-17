import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private service: ServiceService, private authService: AuthService, private router: Router) {}

  onLogin() {
    this.service.login(this.email, this.password).subscribe(
      response => {
        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', response.token);
        // Guardar el nombre de usuario en el almacenamiento local
        localStorage.setItem('userName', response.usuario.nombre);
        // Actualizar el estado de administrador después de iniciar sesión
        this.authService.isAdminStatus();
        // Redirigir a la página principal
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error al iniciar sesión', error);
        alert('Correo o contraseña incorrectos');
      }
    );
  }
}
