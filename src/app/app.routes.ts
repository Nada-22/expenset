import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: '', canActivate:[authGuard], children: [
            {
                path: 'expense',
                loadChildren: () => import('@features/expense/expense.routes').then(m => m.ExpenseRoutes)
            },

        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('@features/auth/auth.routes').then(m => m.AuthRoutes)
    },
];
