import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Item } from '../item-details/item-detail.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  constructor(
    private itemsService: ItemsService,
    private currentroute: ActivatedRoute,
    private navCtrl: NavController
  ) {}
  selectedItem: Item = new Item(
    -1,
    'itemName',
    'Desc',
    [15, 51],
    'date',
    'img'
  );
  ngOnInit() {
    this.currentroute.paramMap.subscribe((paramM) => {
      if (paramM.has('itemId')) {
        const currentItem = paramM.get('itemId');
        this.selectedItem = this.itemsService.getItem(parseInt(currentItem));
      }
    });
  }

  saveEdit(form: NgForm) {
    //get next item id
    //this.item.id = this.itemsService.getNextId();
    //this.item.image = this.itemPhoto;
    this.selectedItem.name = form.value['item-name'];
    this.selectedItem.description = form.value['desc'];

    //Reminder
    const date: string = form.value['dt-date'];
    const time: string = form.value['dt-time'];
    const DT: string = date.slice(0, 10) + time.slice(10, 16);
    this.selectedItem.reminder = DT;
    // this.CreateNotification(DT, this.item.name, this.item.description);
    //Create reminder if set

    //Create new item
    this.itemsService.editItem(this.selectedItem.id, this.selectedItem);

    this.navCtrl.back();
  }
}
