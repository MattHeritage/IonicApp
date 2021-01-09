import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchItemsPageRoutingModule } from './search-items-routing.module';

import { SearchItemsPage } from './search-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchItemsPageRoutingModule
  ],
  declarations: [SearchItemsPage]
})
export class SearchItemsPageModule {}
