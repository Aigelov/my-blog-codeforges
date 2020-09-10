import { NgModule } from '@angular/core';
import { PostListModule } from './post-list/post-list.module';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from './services/blog.service';


@NgModule({
    imports: [
      HttpClientModule,
      PostListModule
    ],
    exports: [
      PostListModule
    ],
    declarations: [],
    providers: [
      BlogService
    ],
})

export class BlogModule {
}
