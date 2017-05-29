import{ Component, Input } from '@angular/core';
import{ IBlogPost } from './blogpost';

@Component({
  selector : 'comp-post',
  templateUrl : './blogpost.component.html'
})
export class BlogPostComponent {
  @Input() currentPost : IBlogPost;
}
