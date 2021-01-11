import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item-details/item-detail.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
})
export class RemindersPage implements OnInit {
  constructor(private itemsService: ItemsService) {}
  items: Item[] = [
    {
      id: -1,
      name: 'TEMP',
      description: '',
      address: [],
      reminder: '',
      image: '',
    },
  ];
  allItems: Item[];
  ngOnInit() {}
  ionViewWillEnter() {
    (this.items = [
      {
        id: -1,
        name: 'TEMP',
        description: '',
        address: [],
        reminder: '',
        image: '',
      },
    ]),
      console.log('Enter view');
    this.allItems = this.itemsService.getAllItems();
    this.allItems.forEach((item) => {
      const date = new Date();
      const itemDate = new Date(item.reminder);
      console.log(date + ' > ' + itemDate);
      if (date < itemDate) {
        console.log('Add to view');

        this.items.push(item);

        console.log(item);
      }
    });

    this.items.shift();
  }
}
