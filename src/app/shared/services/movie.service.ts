import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const options={
  params:{
    include_adult:'false',
    include_video:'true',
    language:'en-US',
    page:'1',
    sort_by:'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzBmYzZiOGU2ZWU5NWZmNTY1YmIxMzE0YjE4ZDFjZSIsIm5iZiI6MTcyODI5ODUwOC4zNDE2NzMsInN1YiI6IjY3MDNiYmViMTc0YTFkNTc3Mzc5NTNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vxl7XkXnRN2P25H5X4U3f8Y0VGrW1DH2M4O8d6ShCME'
  }
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http=inject(HttpClient)
  constructor() { }

  getMovies(){
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }
  getTvShows() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/tv', options)
  }

  getRatedMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }

  getBannerImage(id: number) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }

}
