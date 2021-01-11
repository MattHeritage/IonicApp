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
    //   this.writeToFile();
    this.ReadFile();
    //load items from storage here
  }

  private items: Item[] = [
    {
      id: -1,
      name: 'Create a new item at the top!',
      description: '',
      address: [],
      reminder: '',
      image:
        'https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png', //Temp test image
    },
  ];

  getAllItems() {
    return this.items;
  }
  displayItems: Item[];
  getPageItems() {
    this.items.forEach((item) => {
      this.displayItems.push(item);
      //  this.displayItems[0] =
    });
  }

  item_: Item;
  getItem(id: number) {
    this.getAllItems().forEach((item) => {
      if (item.id == id) {
        //      console.log('Clicked item id=' + item.id);
        this.item_ = item;
      }
    });
    return this.item_;
  }

  addNewItem(newItem: Item) {
    try {
      this.items.push(newItem);
    } catch {
      this.items[1] = newItem;
    }
    //Save new item to file
    this.writeToFile();
  }
  destroyItem(id: number) {
    //Remove item from list
    this.getAllItems().forEach((item) => {
      if (item.id == id) {
        //    console.log('Destroyed item id=' + item.id);
        this.item_ = item;
        const itemIndex = this.getAllItems().indexOf(item);
        //    console.log(this.items[itemIndex]);
        this.items.splice(itemIndex, 1);
        this.writeToFile();
      }
    });
  }
  getNextId() {
    //Return the next id number

    return this.items[this.items.length - 1].id + 1;
  }
  writeToFile() {
    //Save data to file
    //   console.log('Save'); //Add the obj beings saved
    this.getAllItems().forEach((item) => {
      //    console.log(item);
    });
    //  console.log('End save');
    // console.log(this.formatDataForSave());
    Filesystem.deleteFile({
      path: 'saveIt/items-save.json',
      directory: FilesystemDirectory.Documents,
    });
    this.destroyItem(-1);
    const result = Filesystem.writeFile({
      path: 'saveIt/items-save.json',
      data: this.formatDataForSave(),
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
    this.formattedData = ''; //{"id":1,"name":"Save 1","description":"Description 1","address":[],"reminder":"Reminder 1","image":"https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"}\n
  }
  private test: Item[] = [];
  ReadFile() {
    //Load data from file
    //  console.log('read');
    try {
      let contents = Filesystem.readFile({
        path: 'saveIt/items-save.json',
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
      }).then((file) => {
        //   console.log(file.data);
        const lines = file.data.trim().split(/\n/g);
        // console.log(file.data);
        lines.forEach((item) => {
          this.items.push(JSON.parse(item));
        });
        this.destroyItem(-1);
        if (this.items.length <= 0) {
          this.items = this.createFillerItems();
        }
        // console.log(this.items);
      });
    } catch {
      console.log('Failed to load file');
    }
  }
  formattedData: string =
    '{"id":-1,"name":"BS 1","description":"Description 1","address":[],"reminder":"Reminder 1","image":"https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"}\n';
  //Convert data to JSON format
  formatDataForSave() {
    this.getAllItems().forEach((item) => {
      this.formattedData = this.formattedData + JSON.stringify(item) + '\n';
    });

    return this.formattedData;
  }
  editItem(editID: number, editedItem: Item) {
    //  console.log(editID);
    this.items.forEach((item) => {
      if (item.id == editID) {
        this.items[this.items.indexOf(item)] = editedItem;
        // console.log('this.items[this.items.indexOf(item)]');
        this.writeToFile();
      }
    });
  }

  createFillerItems() {
    //If no items are in app, fake ones will be created on next load
    const items: Item[] = [
      {
        id: 1,
        name: 'Garage keys',
        description: 'Hanging up by backdoor',
        address: [15.52, 2.52],
        reminder: 'NA',
        image:
          'https://thumbs.dreamstime.com/z/keyring-hanging-wall-keys-three-nail-70158306.jpg', //Temp test image
      },
      {
        id: 2,
        name: 'Glasses',
        description: 'My glasses are on the table',
        address: [15.52, 2.52],
        reminder: 'NA',
        image:
          'https://media.istockphoto.com/photos/eye-glasses-on-desk-with-blur-background-of-doctor-writing-picture-id964827742?k=6&m=964827742&s=170667a&w=0&h=NA-SKzWE-rCLdrLWrcoLJk73Ol6hdsX_N0hG6O1w37E=', //Temp test image
      },
    ];
    return items;
  }
}
