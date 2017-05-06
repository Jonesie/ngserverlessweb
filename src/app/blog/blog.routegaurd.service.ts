import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class BlogPostGaurdService implements CanActivate {

  constructor(private _router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.url.length > 1) {
      let id = +route.url[1].path;
      if (isNaN(id) || id < 0) {
        this._router.navigate(['/']);
        return false;
      }
    }
    return true;
  }

}
