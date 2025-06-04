import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ButtonModule, ListboxModule, FormsModule, CommonModule, DialogModule, InputTextModule, ConfirmDialogModule, ToastModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  providers: [ConfirmationService, MessageService]
})

export class GalleryComponent implements OnInit {

  @Output() selected = new EventEmitter();

  constructor(
    private api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  galleries:any = [];
  selectedGallery:any = null;
  newGallery = "";

  ngOnInit(): void {
    this.getGalleries();
  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  getGalleries(){
    this.api.selectAll('galleries').subscribe({
      next: (res)=>{
        this.galleries = res;
      },
      error: (err)=>{
        this.messageService.add({ severity: 'error', summary: 'HIBA', detail: err.error.message });
      }
    });
  }

  deleteGallery(){
    this.api.delete('galleries', this.selectedGallery.ID).subscribe({
      next: ()=>{
        this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Galéria törölve!' });
        this.getGalleries();
        this.selectedGallery = null;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'HIBA', detail: err.error.message });
      }
    });
  }

  addGallery(){
    this.api.insert('galleries', { name:this.newGallery }).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Galéria felvéve!' });
          this.getGalleries();
          this.newGallery = '';
          this.visible = false;
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'HIBA', detail: err.error.message });
        }
      }
    )
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Biztosan törlöd a kijelölt galériát?',
        header: 'Megerősítés',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.deleteGallery();
        },
        reject: () => {
            this.selectedGallery = null;
        }
    });
  }

  selectGallery(){
      this.selected.emit(this.selectedGallery);
  }
}
