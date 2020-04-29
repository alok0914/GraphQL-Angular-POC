import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
    providedIn: 'root',
})
export class CreatePost extends Mutation {
    document = gql`
    mutation createPost($data: CreatePostInput!){
        createPost(data: $data) {
            id
            title
            body
            comments {
                id
                author {
                    id
                    name
                }
            }
      }
    }
  `;
}