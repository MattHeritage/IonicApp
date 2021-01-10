import { Injectable } from '@angular/core';
import {
  Filesystem,
  FilesystemDirectory,
  FilesystemEncoding,
} from '@capacitor/core';
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
      address: [],
      reminder: 'Reminder 1',
      image:
        'https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png', //Temp test image
      inBin: false,
    },
    {
      id: 'item2',
      name: 'Item 2',
      description: 'Description 2',
      address: [],
      reminder: 'Reminder 2',
      image:
        'https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png', //Temp test image
      inBin: false,
    },
  ];

  getAllItems() {
    return [...this.items];
  }

  item_: Item;
  getItem(id: string) {
    this.getAllItems().forEach((item) => {
      if (item.id == id) {
        console.log('Clicked item id=' + item.id);
        this.item_ = item;
      }
    });
    return this.item_;
  }
}
