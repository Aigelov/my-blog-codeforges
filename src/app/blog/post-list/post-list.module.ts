import { NgModule } from '@angular/core';

import { PostListComponent } from './post-list.component';
import { CommonMaterialModule } from '../../common/material/common-material.module';
import { PostEditComponent } from '../post-edit/post-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostAddComponent } from '../post-add/post-add.component';
import { PostDeleteComponent } from '../post-delete/post-delete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonMaterialModule
  ],
  exports: [
    PostListComponent
  ],
  declarations: [
    PostListComponent,
    PostAddComponent,
    PostEditComponent,
    PostDeleteComponent
  ],
  providers: [],
})

export class PostListModule {
}
