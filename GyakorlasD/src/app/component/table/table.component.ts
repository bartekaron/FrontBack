import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  handle: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  users: User[] = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', handle: 'mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', handle: 'fat' },
    { id: 3, firstName: 'John', lastName: 'Doe', handle: 'social' }
  ];

  editingUser: User | null = null;
  newUser: User = { id: 0, firstName: '', lastName: '', handle: '' };
  showNewForm = false;

  startEditing(user: User): void {
    this.editingUser = { ...user };
  }

  cancelEditing(): void {
    this.editingUser = null;
  }

  saveUser(): void {
    if (this.editingUser) {
      const index = this.users.findIndex(u => u.id === this.editingUser!.id);
      if (index !== -1) {
        this.users[index] = { ...this.editingUser };
      }
      this.editingUser = null;
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }

  showAddNewForm(): void {
    this.showNewForm = true;
    this.newUser = { id: this.getNextId(), firstName: '', lastName: '', handle: '' };
  }

  cancelNewUser(): void {
    this.showNewForm = false;
  }

  addNewUser(): void {
    this.users.push({ ...this.newUser });
    this.showNewForm = false;
  }

  private getNextId(): number {
    return Math.max(0, ...this.users.map(u => u.id)) + 1;
  }
}
