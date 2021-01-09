import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: 'item-details',
    loadChildren: () => import('./item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'all-items',
    loadChildren: () => import('./all-items/all-items.module').then( m => m.AllItemsPageModule)
  },
  {
    path: 'search-items',
    loadChildren: () => import('./search-items/search-items.module').then( m => m.SearchItemsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'reminders',
    loadChildren: () => import('./reminders/reminders.module').then( m => m.RemindersPageModule)
  },
  {
    path: 'bin',
    loadChildren: () => import('./bin/bin.module').then( m => m.BinPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
