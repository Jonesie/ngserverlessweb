import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BlogService } from './blog.service';
import { IBlogIndex } from './blogindex';

@Component({
  selector: 'comp-index',
  templateUrl: 'blogindex.component.html'
})
export class BlogIndexComponent implements OnInit {

  index: IBlogIndex[];
  errorMessage: string;
  private sub: Subscription;

  constructor(private _service: BlogService) {

  }

  ngOnInit() {
    this.sub = this._service.getIndex()
      .subscribe(
        index => this.index = index.sort((a,b) => {return b.page - a.page;}),
        error => this.errorMessage = <any>error
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
