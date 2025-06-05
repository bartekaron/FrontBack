import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StoragePackage } from '../../../interfaces/storage-package';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';  
import { CardModule } from 'primeng/card';    
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-storagepackages',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  templateUrl: './storagepackages.component.html',
  styleUrls: ['./storagepackages.component.scss'],
  providers: [MessageService]  
})
export class StoragePackagesComponent implements OnInit {
  storages: any[] = [];
  user: any = null;

  constructor(private api: ApiService, private messageService: MessageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.kapdmeg();
  }

  kapdmeg() {
    this.api.getStoragePackages().subscribe(
      (response: any) => {
        if (response.success) {
          this.storages = response.storages;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba',
            detail: 'Nem sikerült betölteni a tároló csomagokat.'
          });
        }
      },
      (error) => {
        console.error('Hiba történt a tároló csomagok betöltésekor', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba',
          detail: 'Hiba történt a betöltés során.'
        });
      }
    );
  }
  
  subscribeToPackage(storageId: string) {
    this.user = this.authService.loggedUser();

    const database_data = {
      dbname: this.user.name + '_db',
    }

    this.api.createDatabase(database_data).subscribe(
      (response: any) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres adatbázis létrehozás',
            detail: 'Sikeresen létrehoztuk az adatbázisodat.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba',
            detail: 'Nem sikerült létrehozni az adatbázist.'
          });
        }
      },
      (error) => {
        console.error('Hiba történt az adatbázis létrehozás során', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba',
          detail: 'Hiba történt az adatbázis létrehozás során.'
        });

      }
    );

    const subscription_data = {
      date: new Date(),
      storageID: storageId,
      userID: this.user.id
    };
    
    this.api.createSubscription(subscription_data).subscribe(
      (response: any) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres előfizetés',
            detail: 'Sikeresen előfizettél a tároló csomagra.Emailben küldjük jelszavadat.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba',
            detail: 'Nem sikerült előfizetni a tároló csomagra.'
          });
        }
      },
      (error) => {
        console.error('Hiba történt az előfizetés során', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba',
          detail: 'Hiba történt az előfizetés során.'
        });
      }
    );

    const domain_data = {
      domain: this.user.name + '.com',
    };

    this.api.updateDomain(this.user.id, domain_data).subscribe(
      (response: any) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres domain létrehozás',
            detail: 'Sikeresen létrehoztuk a domainodat.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba',
            detail: 'Nem sikerült létrehozni a domainodat.'
          });
        }
      },
      (error) => {
        console.error('Hiba történt a domain létrehozás során', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba',
          detail: 'Hiba történt a domain létrehozás során.'
        });
      }
    );

    const user_data = {
      username: this.user.name,
      email: this.user.email,
    };

    this.api.createUser(user_data).subscribe(
      (response: any) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres felhasználó létrehozás',
            detail: 'Sikeresen létrehoztuk a felhasználódat.'
          });
        }
      }
     /* (error) => {
        console.error('Hiba történt a felhasználó létrehozás során', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba',
          detail: 'Hiba történt a felhasználó létrehozás során.'
        });
      }*/
    );

    const privileges_data = {
      dbname: this.user.name + '_db',
      username: this.user.name,
      privileges: 'SELECT',
    };
    
    this.api.grantPrivileges(privileges_data).subscribe(
      (response: any) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres jogosultságok hozzáadása',
            detail: 'Sikeresen hozzáadtuk a jogosultságokat.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba',
            detail: 'Nem sikerült hozzáadni a jogosultságokat.'
          });
        }
      },
      (error) => {
        console.error('Hiba történt a jogosultságok hozzáadása során', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba',
          detail: 'Hiba történt a jogosultságok hozzáadása során.'
        });
      }
    );

  }
  
}
