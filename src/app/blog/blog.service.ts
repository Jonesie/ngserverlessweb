import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IBlogIndex } from './blogindex';
import { IBlogPost } from './blogpost';
import { environment } from '../../environments/environment';

@Injectable()
export class BlogService {

  private _blogIndexUrl: string;
  private _blogPostUrl: string;

  constructor(private _http: Http) {
      if(environment.production) {
        this._blogIndexUrl = 'https://s3-us-west-2.amazonaws.com/jonesie.kiwi/assets/content/blogindex.json';
        this._blogPostUrl = 'https://s3-us-west-2.amazonaws.com/jonesie.kiwi/assets/content/';
      } else {
        this._blogIndexUrl = '/assets/content/blogindex.json';
        this._blogPostUrl = '/assets/content/';
      }
  }

  getIndex(): Observable<IBlogIndex[]> {
    return this._http.get(this._blogIndexUrl)
      .map((response: Response) => <IBlogIndex[]>response.json())
      //.do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getPost(postId: number): Observable<IBlogPost> {
    return this._http.get(`${this._blogPostUrl}${postId}.json`)
      .map((response: Response) => <IBlogPost>response.json())
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
