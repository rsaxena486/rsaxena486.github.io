import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  width: any;
  height: any;

  constructor() {
    this.width = window.innerWidth + 'px';
    this.height = (window.innerHeight - 125) + 'px';
    console.log(this.width);
    console.log(this.height);
  }

  ngOnInit() {
  }
}
