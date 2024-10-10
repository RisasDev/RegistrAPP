import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {

  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  createUser() {
    const newUser = { 
      username: 'Mauricio', 
      email: 'ma.urrutiac@duocuc.cl'
    };
    
    this.apiService.createUser(newUser).subscribe((response) => {
      console.log(response);

      this.ngOnInit();
    });
  }
}