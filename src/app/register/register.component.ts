import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { CreateUser } from '../services/createUser.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private apollo: Apollo,
        private srv: CreateUser) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            age: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        let createPostData = {
            name: this.registerForm.controls['name'].value,
            email: this.registerForm.controls['email'].value,
            age: parseInt(this.registerForm.controls['age'].value)
        };
        this.srv
            .mutate({
                data: createPostData,
            })
            .subscribe(user => {
                this.router.navigateByUrl('/home');
                localStorage.setItem('userID', user.data['createUser']['id']);
            });
    }
}
