import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from './blog.service';

import { IBlogPost } from './blogpost';

@Component({
  selector: 'comp-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent {

  currentPost: IBlogPost;
  errorMessage: string;
  private sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _blogService: BlogService) {
  }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getPost(id);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getPost(id: number) {
    if (!id) id = 0;
    this._blogService.getPost(id).subscribe(
      post => {
        this.currentPost = post;
        this._blogService.getPostBody(id).subscribe(
          body => this.currentPost.body = body,
          error => this.errorMessage = <any>error);
      },
      error => this.errorMessage = <any>error);
  }


}
