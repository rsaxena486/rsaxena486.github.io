import { Component, OnInit } from '@angular/core';
import { GlobalsService } from './../../globals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  products: any;
  dataLoaded = false;
  constructor(private gserv: GlobalsService) { }

  ngOnInit() {
    this.gserv.getTopPhones().subscribe(
      data => {
        if (data.fromRedis) {
          // From Redis
          data.data = JSON.parse(data.data);
          this.products = data.data;
        } else {
          this.products = data;
        }
        this.products.map(product => {
          product.features = product.features.split('|');
          product.features.splice(-1, 1);
        });
        // console.log(this.products);
        this.dataLoaded = true;
      }, err => {
        console.log(err);
      }
    );
  }

}
