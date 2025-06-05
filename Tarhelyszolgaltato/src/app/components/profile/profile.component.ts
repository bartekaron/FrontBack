import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    CardModule
    
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  subscription: any = null;
  storage: any = null;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.loggedUser();
    if (this.user) {
      this.apiService.getSubscriptionByUserId(this.user.id).subscribe(
        (response) => {
          this.subscription = response.subscription[0];
            this.apiService.getStorageById(this.subscription.storageID).subscribe(
              (storageResponse) => {
                this.storage = storageResponse.storage;
              },
              (error) => {
                console.error('Error fetching storage data:', error);
              }
            );
        },
        (error) => {
          console.error('Error fetching subscription data:', error);
        }
      );
    }
  }
}