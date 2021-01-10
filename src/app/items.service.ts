import { Injectable } from '@angular/core';
import {
  Filesystem,
  FilesystemDirectory,
  FilesystemEncoding,
} from '@capacitor/core';
import { readFile } from 'fs';
import { Item } from 'src/app/item-details/item-detail.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor() {
    this.writeToFile();
    this.ReadFile();
    //load items from storage here
  }

  private items: Item[] = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description 1',
      address: [],
      reminder: 'Reminder 1',
      image:
        'https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png', //Temp test image
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description 2',
      address: [],
      reminder: 'Reminder 2',
      image:
        'https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png', //Temp test image
    },
  ];

  getAllItems() {
    return [...this.items];
  }

  item_: Item;
  getItem(id: number) {
    this.getAllItems().forEach((item) => {
      if (item.id == id) {
        console.log('Clicked item id=' + item.id);
        this.item_ = item;
      }
    });
    return this.item_;
  }

  addNewItem(newItem: Item) {
    this.items.push(newItem);
  }
  destroyItem(id: number) {
    //Remove item from list
    this.getAllItems().forEach((item) => {
      if (item.id == id) {
        console.log('Destroyed item id=' + item.id);
        this.item_ = item;
        const itemIndex = this.getAllItems().indexOf(item);
        console.log(this.items[itemIndex]);
        this.items.splice(itemIndex, 1);
      }
    });
  }
  getNextId() {
    //Return the next id number
    return this.items[this.items.length - 1].id + 1;
  }
  writeToFile() {
    //Save data to file
    try {
      const result = Filesystem.writeFile({
        path: 'saveIt/items.txt',
        data: this.formatDataForSave(),
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
      });
    } catch (e) {}
  }
  ReadFile() {
    //Load data from file
    try {
      let contents = Filesystem.readFile({
        path: 'saveIt/items.txt',
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
      }).then((file) => {
        console.log(file.data);
      });
    } catch {}
  }
  formattedData: string; //Convert data to JSON format
  formatDataForSave() {
    this.getAllItems().forEach((item) => {
      this.formattedData = this.formattedData + JSON.stringify(item) + '\n';
    });

    return this.formattedData;
  }
}
