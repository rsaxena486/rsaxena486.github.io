import {
  Injectable,
  EventEmitter
} from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions
} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private options = new RequestOptions({
    headers: this.headers
  });

  api = 'http://localhost:27017';
  constructor(private http: Http) { }

  getProduct(id) {
    return this.http.get(this.api + `/product/${id}`).pipe(map(res => res.json()));
  }

  getTopPhones() {
    return this.http.get(this.api + `/topphones`).pipe(map(res => res.json()));
  }

  getRealtimeSearchResults(query) {
    console.log({search_query: query});
    return this.http.post(this.api + `/realsearch`, {search_query: query}).pipe(map(res => res.json()));
  }

  getAllSearchResults(query) {
    console.log({search_query: query});
    return this.http.post(this.api + `/search`, {search_query: query}).pipe(map(res => res.json()));
  }

}
