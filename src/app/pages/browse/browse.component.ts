
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/component/header/header.component';
import { BannerComponent } from '../../core/component/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from "../../shared/component/movie-carousel/movie-carousel.component";
import { IVideoContent } from '../../shared/models/video-content.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, MovieCarouselComponent, CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent {

  auth=inject(AuthService)
  movieService=inject(MovieService);
  name=JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  email=JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  userProfileImg=JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  bannerDetails=new Observable<any>()
  bannerVideo=new Observable<any>()
 
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];


  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit(){
   forkJoin(this.sources).pipe(
    map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated])=>{
     this.bannerDetails= this.movieService.getBannerDetail(movies.results[0].id);
     this.bannerVideo= this.movieService.getBannerVideo(movies.results[0].id);
      return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated}
   })).subscribe((res:any)=>{
    this.movies = res.movies.results as IVideoContent[];
    this.tvShows = res.tvShows.results as IVideoContent[];
    this.ratedMovies = res.ratedMovies.results as IVideoContent[];
    this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
    this.upcomingMovies = res.upcoming.results as IVideoContent[];
    this.popularMovies = res.popular.results as IVideoContent[];
    this.topRatedMovies = res.topRated.results as IVideoContent[]
   })
   console.log("sdadad",this.userProfileImg)
  }
  
 
}
