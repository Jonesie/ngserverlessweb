import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BlogService } from './blog.service';
import { IBlogPost } from './blogpost';


@Component({
  selector : 'comp-blogsummary',
  templateUrl : './blogsummary.component.html'
})
export class BlogSummaryComponent {

  @Input()maxPosts : number = 5;
  errorMessage: string;

  index: IBlogPost[];
  private sub: Subscription;

  constructor(private _service: BlogService) {

  }

  ngOnInit() {
    this.sub = this._service.getIndex()
      .subscribe(
      index => {
        this.index = index.sort((a, b) => { return b.post - a.post; }).slice(0, this.maxPosts-1);
      },
      error => this.errorMessage = <any>error
      );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
