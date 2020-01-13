import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LenderService {

  constructor(private http: HttpClient) {
  }
  retrieveLenderOptions() {
    return this.http.get <any[]>('/api/lender/options');
  }

  getLenders() {
    return this.http.get('/api/lender/list');
  }

  createLender(lender) {
    return this.http.post('/api/lender/create', lender);
  }

  updateLender(lender) {
    return this.http.put('/api/lender/' + lender.id + '/update', lender);
  }

  getLender(id) {
    return this.http.get('/api/lender/' + id + '/get');
  }

  deleteLender(lender) {
    return this.http.delete('/api/lender/' + lender.id + '/delete');
  }
}
