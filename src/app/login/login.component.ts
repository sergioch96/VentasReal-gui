import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiauthService } from "../services/apiauth.service";

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    public loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
        public apiauthService: ApiauthService,
        private router: Router,
        private fb: FormBuilder
    ) { 
        // if (this.apiauthService.usuarioData) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {

    }

    login() {
        this.apiauthService.login(this.loginForm.value).subscribe( response => {
            if (response.exito === 1) {
                this.router.navigate(['/']);
            }
        })
    }
}