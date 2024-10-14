import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  let router=inject(Router)
  let userToken=sessionStorage.getItem("loggedInUser")
  
  if(userToken == null){  
    router.navigate(['login'])
    return false
  }
   return true;
};
