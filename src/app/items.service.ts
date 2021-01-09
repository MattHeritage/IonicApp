import { Injectable } from '@angular/core';
import { Item } from 'src/app/item-details/item-detail.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor() {
    //load items from storage here
  }

  private items: Item[] = [
    {
      id: 'item1',
      name: 'Item 1',
      description: 'Description 1',
      address: 'Address 1',
      reminder: 'Reminder 1',
      image: 'Image 1',
    },
    {
      id: 'item2',
      name: 'Item 2',
      description: 'Description 2',
      address: 'Address 2',
      reminder: 'Reminder 2',
      image: 'Image 2',
    },
  ];

  getAllItems() {
    return [...this.items];
  }

 
  }
}
