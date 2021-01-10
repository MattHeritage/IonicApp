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
  destroyItem() {
    //Move selected item to bin
    console.log('Bin');
  }

  fullitems: Item[];
  // search
  searchInput(searchText) {
    if (searchText == '') {
      //If search is empty load all items
      this.items = this.ItemService.getAllItems();
    }

    this.items = []; //Clear items
    this.fullitems = this.ItemService.getAllItems();
    this.fullitems.forEach((item) => {
      var lc = item.name.toLowerCase(); //Convert to lower case to ensure every match is found
      if (lc.includes(searchText.toLowerCase())) {
        this.items.push(item);
      }
    });
  }
}
