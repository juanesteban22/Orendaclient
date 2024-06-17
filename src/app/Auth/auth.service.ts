import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  constructor(private router: Router) { }

  isAdminStatus(): void {
    const token = localStorage.getItem('token');
    const isAdmin = token ? this.decodeToken(token).rol === 'admin' : false;
    this.isAdminSubject.next(isAdmin);
  }

  private decodeToken(token: string): any {
    return {};
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isAdminStatus(); // Actualizar estado de administrador
    // Otros procesos de inicio de sesión...
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
