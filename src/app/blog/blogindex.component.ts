import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from './blog.service';
import { IBlogPost } from './blogpost';

@Component({
  selector: 'comp-index',
  templateUrl: 'blogindex.component.html',
  styles: [
    "li.active { font-weight:bold}"
  ]

})
export class BlogIndexComponent {

  @Input() index: IBlogPost[];

  selectedPost : IBlogPost;
  firstPost: number;

  errorMessage: string;
  //private sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router)
  {
  }

  // ngOnInit() {
  //   this.sub = this._service.getIndex()
  //     .subscribe(
  //     index => {
  //       this.index = index.sort((a, b) => { return b.post - a.post; });
  //       this.firstPost = this.index[0].post;
  //     },
  //     error => this.errorMessage = <any>error
  //     );
  // }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  isActive(item : IBlogPost) : boolean {
    if(this.selectedPost) {
      return item.post == this.selectedPost.post;
    }
    return false;
  }

  onSelect(item : IBlogPost) : void {
    this.selectedPost = item;
    this._router.navigate([item.post], { relativeTo: this._route });
  }
}
