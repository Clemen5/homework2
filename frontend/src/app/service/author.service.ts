import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {
  }

  retrieveAuthorOptions() {
    return this.http.get <any[]>('/api/author/options');
  }
}
