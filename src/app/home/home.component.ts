import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CreateComment } from '../services/createComment.service';
import { CreatePost } from '../services/createPost.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: any;
  addComment: FormGroup;
  addPost: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private apollo: Apollo,
              private createPost: CreatePost,
              private createComment: CreateComment) {
    this.apollo
      .watchQuery({
        query: gql`
          query {
            posts {
              id
              title
              body
              comments {
                id
                text
                author {
                  name
                  id
                }
              }
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        // tslint:disable-next-line: no-string-literal
        this.posts = result.data['posts'];
      });
  }

  ngOnInit() {
    this.addComment = this.formBuilder.group({
      description: ['', Validators.required]
    });

    this.addPost = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  addComments(id) {
    const createCommentData = {
      text: this.addComment.controls['description'].value,
      author: localStorage.getItem('userID'),
      post: id
    }
    this.createComment
      .mutate({
        data: createCommentData,
      })
      .subscribe(comment => {
        this.posts.forEach(node => {
          if (node.id == comment.data['createComment']['post']['id']) {
            node.comments.unshift(comment.data['createComment']);
            this.addComment.controls['description'].setValue(null);
          }
        });
      });

  }

  addNewPost() {
    let createCommentData = {
      title: this.addPost.controls['title'].value,
      body: this.addPost.controls['body'].value,
      author: localStorage.getItem('userID'),
      published: true
    }

    this.createPost
      .mutate({
        data: createCommentData,
      })
      .subscribe(post => {
        this.posts.unshift(post.data['createPost']);
      });

    this.addPost.controls['body'].setValue(null);
    this.addPost.controls['title'].setValue(null);
  }
}
