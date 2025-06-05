import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  items = [
    { label: 'Regisztráció', icon: 'pi pi-at', routerLink: '/register' },
    { label: 'Bejelentkezés', icon: 'pi pi-sign-in', routerLink: '/login' }
  ];

  loggedInItems = [
    { label: 'Tárhely Csomagok', icon: 'pi pi-database', routerLink: '/storagepackages' },
    { label: 'Profil', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'Kijelentkezés', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  adminItems = [
    { label: 'Tárhely Csomagok', icon: 'pi pi-database', routerLink: '/storagepackages' },  
    { label: 'Csomagok kezelése', icon: 'pi pi-cog', routerLink: '/storage-management' },
    { label: 'Felhasználók kezelése', icon: 'pi pi-users', routerLink: '/user-managment' },
    { label: 'Kijelentkezés', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ){
    this.isLoggedIn = this.getToken() !== null;
    this.isAdmin = this.checkAdminStatus();
    this.router.events.subscribe(() => {
      this.isLoggedIn = this.getToken() !== null;
      this.isAdmin = this.checkAdminStatus();
    });
  }

  getToken(): string | null {
    return localStorage.getItem('tarhelyszolgaltato');
  }

  checkAdminStatus(): boolean {
    const user = this.authService.loggedUser();
    return user ? user.role === 'admin' : false;
  }

  logout() {
    localStorage.removeItem('tarhelyszolgaltato');
    localStorage.removeItem('user');
    localStorage.removeItem('loggedUserId');
    this.isLoggedIn = false;
    this.isAdmin = false;

    this.router.navigate(['/login']);
  }
}
