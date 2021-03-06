import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IBlogPost } from './blogpost';
import { environment } from '../../environments/environment';

@Injectable()
export class BlogService {

  private _blogIndexUrl: string;
  private _blogPostUrl: string;

  constructor(private _http: Http) {
      if(!environment.localassets) {
        this._blogIndexUrl = 'https://s3-us-west-2.amazonaws.com/jonesie.kiwi/assets/content/blogindex.json';
        this._blogPostUrl = 'https://s3-us-west-2.amazonaws.com/jonesie.kiwi/assets/content/';
        console.log("Using S3 Assets");
      } else {
        this._blogIndexUrl = '/assets/content/blogindex.json';
        this._blogPostUrl = '/assets/content/';
        console.log("Using Local Assets");
      }
  }

  getIndex(): Observable<IBlogPost[]> {
    return this._http.get(this._blogIndexUrl)
      .map((response: Response) => <IBlogPost[]>response.json())
      //.do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getPostBody(postId : number) : Observable<string> {
    return this._http.get(`${this._blogPostUrl}${postId}.html`)
      .map((response: Response) => response.text())
      //.do(data => console.log('All: ' + data))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
