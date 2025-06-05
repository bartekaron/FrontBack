import { Routes } from '@angular/router';
import { TableComponent } from './component/table/table.component';
import { CardsComponent } from './component/cards/cards.component';

export const routes: Routes = [
    { path: '', redirectTo: 'table', pathMatch: 'full' },
    { path: 'table', component: TableComponent },
    { path: 'cards', component: CardsComponent }
];
