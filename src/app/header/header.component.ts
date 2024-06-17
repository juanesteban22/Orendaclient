import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { AuthService } from '../Auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productCount = 0;
  MenuOpen = false;
  userName: string | null = null;
  isAdmin$: Observable<boolean>;

  constructor(
    private cartService: ServiceService,
    private authService: AuthService
  ) {
    this.cartService.cart$.subscribe(products => {
      this.productCount = products.length;
    });
    this.isAdmin$ = this.authService.isAdmin$;
  }

  ngOnInit(): void {
    this.loadUserInfo();
    this.authService.isAdminStatus();
  }

  loadUserInfo() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const user = JSON.parse(usuario);
      this.userName = `${user.nombre} ${user.apellido}`;
    }
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    this.authService.logout();
    this.loadUserInfo();
  }

  toggleMenu() {
    this.MenuOpen = !this.MenuOpen;
  }
}
