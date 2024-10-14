import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({required:true}) userImage:string=''

  auth=inject(AuthService)
  navList=["Home","TV Shows", "News & Popular","My List", "Browse by Language"]

  signOut(){
    if (sessionStorage.getItem("loggedInUser")) {
      sessionStorage.removeItem("loggedInUser");
      console.log("Item removed.");
    } else {
      console.log("No such item found.");
    }
    this.auth.signOut();
  }
}
