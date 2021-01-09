import { Component, OnInit } from '@angular/core';
import { Item } from '../item-details/item-detail.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.page.html',
  styleUrls: ['./search-items.page.scss'],
})
export class SearchItemsPage implements OnInit {
  constructor(private ItemService: ItemsService) {}
  items: Item[];
  ngOnInit() {
    //Grab items from service
    this.items = this.ItemService.getAllItems();
  }
}
