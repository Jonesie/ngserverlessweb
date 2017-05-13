import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BlogService } from './blog.service';
import { IBlogIndex } from './blogindex';
import { IBlogPost } from './blogpost';

@Component({
  selector: 'comp-index',
  templateUrl: 'blogindex.component.html',
  styles: [
    "li.active { font-weight:bold}"
  ]

})
export class BlogIndexComponent implements OnInit {

  @Input() activePost: IBlogPost;
  firstPost: number;
  index: IBlogIndex[];
  errorMessage: string;
  private sub: Subscription;

  constructor(private _service: BlogService) {

  }

  ngOnInit() {
    this.sub = this._service.getIndex()
      .subscribe(
      index => {
        this.index = index.sort((a, b) => { return b.page - a.page; });
        this.firstPost = this.index[0].page;
      },
      error => this.errorMessage = <any>error
      );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getActiveClass(item: IBlogIndex): string {
    return (item.page == this.activePost.post) ? 'active' : '';
  }
}
