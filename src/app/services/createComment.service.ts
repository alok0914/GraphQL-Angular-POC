import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CreateComment extends Mutation {
  document = gql`
    mutation createComment($data: CreateCommentInput!){
      createComment(data: $data) {
            id
            text
            post {
              id
            }
            author {
              name
              id
            }
      }
    }
  `;
}