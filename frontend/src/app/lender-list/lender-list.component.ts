import { Component, OnInit } from '@angular/core';
import {GenreService} from '../service/genre.service';
import {UserService} from '../service/user.service';
import {LenderService} from '../service/lender.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-lender-list',
  templateUrl: './lender-list.component.html',
  styleUrls: ['./lender-list.component.scss']
})
export class LenderListComponent implements OnInit {

  lenders: any[];
  displayedColumns = ['first_name', 'last_name', 'lending_date', 'year_of_birth', 'id' ];

  constructor(private lenderService: LenderService, public userService: UserService) {
  }

  ngOnInit() {
    this.lenderService.getLenders()
      .subscribe((response: any[]) => {
        this.lenders = response;
      });
  }

  deleteLender(lender: any) {
    this.lenderService.deleteLender(lender)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
