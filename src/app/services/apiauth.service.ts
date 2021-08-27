import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Response } from "../models/response";
import { Usuario } from "../models/usuario";
import { map } from "rxjs/operators";

const httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

@Injectable({
    providedIn: 'root'
})
export class ApiauthService {
    url: string = 'https://localhost:44306/api/User/login';

    private usuarioSubject: BehaviorSubject<Usuario>;

    // obtiene el usuario de la subscripcion
    public get usuarioData(): Usuario {
        return this.usuarioSubject.value;
    }

    constructor(
        private _http: HttpClient
    ) { 
        this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!))
    }

    // obtiene el usuario de la respuesta, la guarda en sesion y avisa que existe un nuevo usuario a susbscriptores
    login(email: string, password: string): Observable<Response> {
        return this._http.post<Response>(this.url, {email, password}, httpOption).pipe(
            map( res => {
                if (res.exito === 1) {
                    const usuario: Usuario = res.data;
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    this.usuarioSubject?.next(usuario);
                }
                return res;
            })
        );
    }

    // remueve el usuario de la sesion y avisa a los susbcriptores
    logout() {
        localStorage.removeItem('usuario');
        this.usuarioSubject?.next(null!);
    }
}