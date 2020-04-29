import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
    providedIn: 'root',
})
export class CreateUser extends Mutation {
    document = gql`
    mutation createUser($data: CreateUserInput!){
        createUser(data: $data) {
            id
            name
            email
      }
    }
  `;
}