import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Post {
  id: string;
  title: string;
  body: number;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
export interface Response {
  posts: Post[];
}


@Injectable({
  providedIn: 'root',
})
export class AllPostsGQL extends Query<Response> {
  document = gql`
    query allPosts {
      posts {
        id
        title
        votes
        author {
          id
          firstName
          lastName
        }
      }
    }
  `;
}