import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  // test_array = [1 ,2 ,3 ,4 ,5];
  search_results: any = [];
  constructor(private gserv: GlobalsService) { }

  ngOnInit() {
  }

  realtimeSearch(e) {
    this.gserv.getRealtimeSearchResults(e.target.value).subscribe(
      data => {
        console.log(data);
        this.search_results = data;
      }, err => {
        console.log(err);
      }
    );
  }

}
