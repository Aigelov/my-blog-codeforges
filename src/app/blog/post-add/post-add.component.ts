import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { PostModel } from '../models/post-model';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})

export class PostAddComponent implements OnInit {

  public postForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    subTitle: new FormControl('', [
      Validators.required
    ]),
    imageUrl: new FormControl('', [
      Validators.required
    ]),
    content: new FormControl('', [
      Validators.required
    ])
  });
  public loading = false;

  constructor(
    private readonly blogService: BlogService,
    private readonly dialogRef: MatDialogRef<PostAddComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): Subscription {
    if (this.postForm.valid) {
      this.loading = true;
      const createdPost: PostModel = this.postForm.value;
      return this.blogService.createPost(createdPost)
        .pipe(finalize(() => this.loading = false))
        .subscribe((response: PostModel) => {
          this.dialogRef.close(response);
        });
    }
  }
}
