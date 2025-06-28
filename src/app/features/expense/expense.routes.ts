import { Routes } from "@angular/router";

export const ExpenseRoutes: Routes = [

    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list',
        loadComponent: () => import('./expense-list/expense-list.component').then(c => c.ExpenseListComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./expense-form/expense-form.component').then(c => c.ExpenseFormComponent)
    }
]