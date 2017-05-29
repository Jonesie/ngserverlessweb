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
  index: IBlogPost[];
  firstPost: IBlogPost;

  errorMessage: string;
  private routeSub: Subscription;
  private indexSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _blogService: BlogService) {
  }

  ngOnInit(): void {
    this.indexSub = this._blogService.getIndex()
      .subscribe(
      index => {
        console.log('got index');
        this.index = index.sort((a, b) => { return b.post - a.post; });
        this.firstPost = this.index[0];
        this.selectPost(this.firstPost);
        console.log("first = " + this.firstPost.post);
      },
      error => this.errorMessage = <any>error
      );

    this.routeSub = this._route.params.subscribe(
      params => {
        if (this.index) {
          if (params['id']) {
            let id = +params['id'];
            console.log('route = ' + id);
            this.selectPost(this.index.find(i => i.post == id));
          } else {
            console.log('route = ' + this.firstPost.post);
            this.selectPost(this.firstPost);
          }
        }
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.indexSub.unsubscribe();
  }

  selectPost(post: IBlogPost): void {
    this.currentPost = post;
console.log("getting body " + post.post);
    this._blogService.getPostBody(post.post).subscribe(
      body => this.currentPost.body = body,
      error => this.errorMessage = <any>error);
  }

  // getPost(id: number) {
  //   if (!id) id = 0;
  //   this._blogService.getPost(id).subscribe(
  //     post => {
  //       this.currentPost = post;
  //       this._blogService.getPostBody(id).subscribe(
  //         body => this.currentPost.body = body,
  //         error => this.errorMessage = <any>error);
  //     },
  //     error => this.errorMessage = <any>error);
  // }


}
