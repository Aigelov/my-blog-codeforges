import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { PostModel } from '../models/post-model';
import { MatDialog } from '@angular/material/dialog';
import { PostEditComponent } from '../post-edit/post-edit.component';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostAddComponent } from '../post-add/post-add.component';
import { PostDeleteComponent } from '../post-delete/post-delete.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {

  public posts: PostModel[] = [];
  public displayedColumns: string[] = ['id', 'title', 'subTitle', 'imageUrl', 'content', 'actions'];
  public loading = false;

  constructor(
    private readonly blogService: BlogService,
    private readonly dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList(): void {
    this.loading = true;
    this.blogService.getPostList()
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: PostModel[]) => {
        this.posts = response;
      });
  }

  addPost(): void {
    const dialogRef = this.dialog.open(PostAddComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: PostModel) => {
      if (result) {
        const posts = _.cloneDeep(this.posts);
        posts.unshift(result);
        this.posts = posts;

        this.openSnackBar('Пост успешно добавлен');
      }
    });
  }

  editPost(editedPost: PostModel): void {
    const dialogRef = this.dialog.open(PostEditComponent, {
      data: editedPost,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: PostModel) => {
      if (result) {
        const foundIndex = this.posts.findIndex((item, index) => item.id === result.id);

        const posts = _.cloneDeep(this.posts);
        posts[foundIndex] = result;
        this.posts = posts;

        this.openSnackBar('Пост успешно сохранен');
      }
    });
  }

  deletePost(post: PostModel): void {
    const dialogRef = this.dialog.open(PostDeleteComponent, {
      data: post,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.posts = this.posts.filter(item => item.id !== post.id);

        this.openSnackBar('Пост успешно удален');
      }
    });
  }

  openSnackBar(message: string, action = null): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

