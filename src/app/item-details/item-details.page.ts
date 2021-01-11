import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/items.service';
import { Item } from './item-detail.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  constructor(
    private itemsService: ItemsService,
    private currentRoute: ActivatedRoute
  ) {}

  selectedItem: Item;
  ngOnInit() {
    this.currentRoute.paramMap.subscribe((paramM) => {
      if (paramM.has('itemId')) {
        const currentItem = paramM.get('itemId');
        this.selectedItem = this.itemsService.getItem(parseInt(currentItem));
      }
    });
  }
  ionViewWillEnter() {
    this.selectedItem = this.itemsService.getItem(this.selectedItem.id);
  }
}
