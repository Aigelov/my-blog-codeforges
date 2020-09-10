import { Component, Inject, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { PostModel } from '../models/post-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})

export class PostEditComponent implements OnInit {

  public postForm: FormGroup;
  public title = this.data.title;
  public loading = false;

  constructor(
    private readonly blogService: BlogService,
    private readonly dialogRef: MatDialogRef<PostEditComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: PostModel
  ) {
    this.postForm = new FormGroup({
      id: new FormControl(this.data.id),
      title: new FormControl(this.data.title, [
        Validators.required
      ]),
      subTitle: new FormControl(this.data.subTitle, [
        Validators.required
      ]),
      imageUrl: new FormControl(this.data.imageUrl, [
        Validators.required
      ]),
      content: new FormControl(this.data.content, [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): Subscription {
    if (this.postForm.valid) {
      this.loading = true;
      const editedPost: PostModel = this.postForm.value;
      return this.blogService.editPost(editedPost)
        .pipe(finalize(() => this.loading = false))
        .subscribe((response: PostModel) => {
          this.dialogRef.close(response);
        });
    }
  }
}
