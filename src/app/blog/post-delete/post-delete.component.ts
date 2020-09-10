import { Component, Inject, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { PostModel } from '../models/post-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})

export class PostDeleteComponent implements OnInit {

  public title = this.data.title;

  constructor(
    private readonly blogService: BlogService,
    private readonly dialogRef: MatDialogRef<PostDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: PostModel
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): Subscription {
    return this.blogService.deletePost(this.data)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
