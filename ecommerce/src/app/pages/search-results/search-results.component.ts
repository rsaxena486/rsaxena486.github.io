import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/globals.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  all_search_results: any = [];
  constructor(private gserv: GlobalsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gserv.getAllSearchResults(params.sq).subscribe(
        data => {
          if (data.fromRedis) {
            // From Redis
            data.data = JSON.parse(data.data);
            this.all_search_results = data.data;
          } else {
            this.all_search_results = data;
          }
          this.all_search_results.map(product => {
            product._source.features = product._source.features.split('|');
            product._source.features.splice(-1, 1);
          });
          console.log('All Results', this.all_search_results);
        }, err => {
          console.log(err);
        }
      );
    });
  }

}
