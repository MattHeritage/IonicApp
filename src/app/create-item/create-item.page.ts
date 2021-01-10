import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType,
} from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Item } from '../item-details/item-detail.model';
import { ItemsService } from '../items.service';
@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private itemsService: ItemsService
  ) {}
  item: Item = new Item(
    'id',
    'itemName',
    'Desc',
    [152, 532],
    'date',
    'img',
    false
  ); //Replace these default values
  @ViewChild('form', { static: true }) form: NgForm;
  ngOnInit() {}

  loc: string;
  getUserLocation(el) {
    //Makesure plugin can be used
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
  createItem(form: NgForm) {
    console.log(form.value);
    this.item.image = this.itemPhoto;
    this.itemsService.addNewItem(this.item);
  }
  itemPhoto: string;
  getPhoto() {
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
}
