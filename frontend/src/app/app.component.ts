import { Component } from '@angular/core';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  latitude = 47.06667;
  longitude = 15.45;
  locationChosen = false;

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }

  constructor(private userService: UserService) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

}
