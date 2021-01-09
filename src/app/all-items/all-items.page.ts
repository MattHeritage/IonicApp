import { Component, OnInit } from '@angular/core';
import { Item } from '../item-details/item-detail.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.page.html',
  styleUrls: ['./all-items.page.scss'],
})
export class AllItemsPage implements OnInit {
  constructor(private ItemService: ItemsService) {}
  items: Item[];
  ngOnInit() {
    //Grab items from service
    this.items = this.ItemService.getAllItems();
  }

  openSearch() {}
}
