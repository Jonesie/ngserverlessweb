import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { BlogService } from './blog.service';
import { IBlogPost } from './blogpost';

@Component({
  selector: 'comp-blogmain',
  templateUrl: './blogmain.component.html'
})
export class BlogMainComponent {
  currentPost: IBlogPost;
  errorMessage: string;
  private postSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _blogService: BlogService) {
  }

  ngOnInit(): void {
    this.postSub = this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getPost(id);
      });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
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
