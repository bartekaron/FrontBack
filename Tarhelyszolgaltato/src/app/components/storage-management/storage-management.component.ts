import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StoragePackage } from '../../../interfaces/storage-package';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';  // A Toast modul importálása
import { MessageService } from 'primeng/api';  // A MessageService importálása

@Component({
  selector: 'app-storage-management',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ToastModule,  // A Toast modul hozzáadása
  ],
  templateUrl: './storage-management.component.html',
  styleUrls: ['./storage-management.component.scss'],
  providers: [MessageService]  // MessageService regisztrálása
})
export class StorageManagementComponent implements OnInit {
  storages: StoragePackage[] = [];
  newStorage: StoragePackage = { id: '', name: '', price: 0, description: '', createdAt: '', updatedAt: '' };
  displayDialog: boolean = false;

  constructor(private apiService: ApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getStorages();
  }

  getStorages() {
    this.apiService.getStoragePackages().subscribe((data: any) => {
      this.storages = data.storages;
    });
  }

  addStorage() {
    this.apiService.createStorage(this.newStorage).subscribe(response => {
      this.getStorages();
      this.displayDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Sikeres hozzáadás', detail: 'A tárhelycsomag sikeresen hozzáadva!' });
    });
  }

  deleteStorage(storageId: string) {
    this.apiService.deleteStorage(storageId).subscribe(response => {
      this.getStorages();
      this.messageService.add({ severity: 'success', summary: 'Sikeres törlés', detail: 'A tárhelycsomag sikeresen törölve!' });
    });
  }

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }
}
