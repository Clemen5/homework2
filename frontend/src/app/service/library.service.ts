import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) {
  }

  retrieveLibraryOptions() {
    return this.http.get <any[]>('/api/library/options');
  }

}
