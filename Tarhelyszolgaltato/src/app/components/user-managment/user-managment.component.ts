import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../../interfaces/user';
import { Subscription } from '../../../interfaces/subscription';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ToastModule
  ],
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss'],
  providers: [MessageService]
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  subscriptions: Subscription[] = [];
  displayDialog: boolean = false;

  constructor(private apiService: ApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers().subscribe((data: any) => {
      this.users = data.users;
    });
  }

  viewUserDetails(user: User) {
    this.selectedUser = user;
    this.getUserSubscriptions(user.id);  
    this.displayDialog = true;
  }

  getUserSubscriptions(userId: string) {
    this.apiService.getSubscriptionByUserId(userId).subscribe((data: any) => {
      this.subscriptions = data.subscription;
      
      this.subscriptions.forEach((subscription: any) => {
        this.apiService.getStorageById(subscription.storageID).subscribe((storageData: any) => {
          subscription.storageName = storageData.storage.name;
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Hiba', detail: 'Nem sikerült betölteni a tároló nevét!' });
        });
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Hiba', detail: 'Nem sikerült betölteni az előfizetéseket!' });
    });
  }
  

  hideDialog() {
    this.displayDialog = false;
    this.selectedUser = null;
    this.subscriptions = [];
  }
}
