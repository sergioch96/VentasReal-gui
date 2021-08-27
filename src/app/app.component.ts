import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiauthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  usuario: Usuario | undefined;

  constructor(
    public apiauthService: ApiauthService,
    private router: Router
  ) { 
    this.apiauthService.usuario.subscribe(res => {
      this.usuario = res;
      console.log('cambio el objeto: ' + res);
    });
  }

  logout() {
    this.apiauthService.logout();
    this.router.navigate(['/login']);
  }

}
