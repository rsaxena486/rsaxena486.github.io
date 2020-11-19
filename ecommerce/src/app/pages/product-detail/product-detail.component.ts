import { Component, OnInit } from '@angular/core';
import { GlobalsService } from './../../globals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  dataLoaded = false;

  constructor(private gserv: GlobalsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gserv.getProduct(params.id).subscribe(
        data => {
          data.features = data.features.split('|');
          data.features.splice(-1, 1);
          this.product = data;
          this.dataLoaded = true;
          console.log(this.product);
        }, err => {
          console.log(err);
        }
      );
    });
  }

  counter(i: number) {
    return new Array(i);
  }

}
