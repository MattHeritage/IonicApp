import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType,
  LocalNotifications,
} from '@capacitor/core';
import { AlertController, IonDatetime, NavController } from '@ionic/angular';
import { Item } from '../item-details/item-detail.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private itemsService: ItemsService
  ) {}
  item: Item = new Item(-1, 'itemName', 'Desc', [15, 51], 'Date', 'img'); //Replace these default values

  ngOnInit() {}

  loc: string;
  getUserLocation() {
    //Make sure plugin can be used
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      return;
    }
    Plugins.Geolocation.getCurrentPosition().then((geo) => {
      this.item.address.push(geo.coords.latitude);
      this.item.address.push(geo.coords.longitude);
      console.log(this.item.address[2] + ' ' + this.item.address[3]);
      //Convert to view on form
      this.loc =
        'Lat: ' +
        this.item.address[2].toString() +
        '; Lon: ' +
        this.item.address[3];
    });
  }

  itemPhoto: string;
  getPhoto() {
    //Take or get photo from gallery
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 300,
      width: 220,
      resultType: CameraResultType.Base64,
    })
      .then((img) => {
        this.itemPhoto = img.base64String;
        this.itemPhoto = 'data:image/jpeg;base64, ' + img.base64String;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
  reminderDT: IonDatetime;
  createItem(form: NgForm) {
    //get next item id
    this.item.id = this.itemsService.getNextId();

    //Get data from form
    console.log(form.value);
    this.item.image = this.itemPhoto;
    this.item.name = form.value['item-name'];
    this.item.description = form.value['desc'];

    //Reminder
    const date: string = form.value['dt-date'];
    const time: string = form.value['dt-time'];
    const DT: string = date.slice(0, 10) + time.slice(10, 30);
    console.log(DT);
    this.item.reminder = DT;
    // this.CreateNotification(DT, this.item.name, this.item.description);
    //Create reminder if set

    //Create new item
    this.itemsService.addNewItem(this.item);
    this.navCtrl.back();
  }
  CreateNotification(DT, name, desc) {
    const notifs = LocalNotifications.schedule({
      notifications: [
        {
          title: name,
          body: desc,
          id: 1,
          schedule: { at: DT },
        },
      ],
    });
  }
}
