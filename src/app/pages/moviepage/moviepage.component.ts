import { Component, inject, OnInit, SimpleChanges } from '@angular/core';
import { HeaderComponent } from "../../core/component/header/header.component";
import { BannerComponent } from "../../core/component/banner/banner.component";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-moviepage',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, CommonModule],
  templateUrl: './moviepage.component.html',
  styleUrl: './moviepage.component.css'
})
export class MoviepageComponent implements OnInit{
  private sanitizer=inject(DomSanitizer)
  userProfileImg=JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  bannerTitle:string='';
  bannerOverview:string='';
  key:string='LYaJVfiwv0w';
  videoUrl=this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`)
  
  
  
  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl=this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`)
    }
  }
  
}
