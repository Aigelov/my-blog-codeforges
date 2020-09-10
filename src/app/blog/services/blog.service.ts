import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post-model';
import { ApiConfig } from '../../common/api.config';

@Injectable()
export class BlogService {

  private readonly url = `${ApiConfig.url}`;

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public getPostList(): Observable<PostModel[]> {
    return this.httpClient.get(`${this.url}/posts`) as Observable<PostModel[]>;
  }

  public createPost(createdPost: PostModel): Observable<PostModel> {
    return this.httpClient.post(`${this.url}/posts`, createdPost) as Observable<PostModel>;
  }

  public editPost(editedPost: PostModel): Observable<PostModel> {
    return this.httpClient.put(`${this.url}/posts`, editedPost) as Observable<PostModel>;
  }

  public deletePost(post: PostModel): Observable<any> {
    return this.httpClient.delete(`${this.url}/posts/${post.id}`);
  }
}
