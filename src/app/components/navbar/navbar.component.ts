import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth:AuthService , private route:Router){}

  menuType: string = 'default';

  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
          if(localStorage.getItem('token')){
         
          this.menuType='token';
        }
         else {
          this.menuType = 'default';
        }
      })
    ;
  }
  

    logout(){
      if(window.confirm('Are you sure you want to Logout ?')){
        this.auth.logout()
      }
  }

}
