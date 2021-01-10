import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ItemDetailsPage } from './item-details/item-details.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-items',
    pathMatch: 'full',
  },
  {
    path: 'item-details',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./item-details/item-details.module').then(
            (m) => m.ItemDetailsPageModule
          ),
      },
      {
        path: ':itemId',
        loadChildren: () =>
          import('./item-details/item-details.module').then(
            (m) => m.ItemDetailsPageModule
          ),
      },
    ],
  },
  {
    path: 'all-items',
    loadChildren: () =>
      import('./all-items/all-items.module').then((m) => m.AllItemsPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'reminders',
    loadChildren: () =>
      import('./reminders/reminders.module').then((m) => m.RemindersPageModule),
  },
  {
    path: 'create-item',
    loadChildren: () =>
      import('./create-item/create-item.module').then(
        (m) => m.CreateItemPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
