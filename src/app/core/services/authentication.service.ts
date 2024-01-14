import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { initializeApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "@firebase/auth";
import { ToastController } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/app/shared/types/user";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private auth: Auth;
    private loggedUser = {
        email: 'test@test.com',
        password: '123456'
    }

    private isLoggedInSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
    constructor(private httpClient: HttpClient, private readonly toastCtrl: ToastController) {
        initializeApp(environment.firebase);
        this.auth = getAuth();
        this.login();
        this.httpClient.get('https://monitorulpreturilor.info/pmonsvc/Retail/GetCatalogProductsByNameNetwork?prodname=ceva').subscribe(dt => { console.log(dt) });
    }

    register(user: User) {
        return new Observable(obs => {
            createUserWithEmailAndPassword(this.auth, user.email, user.password)
                .then((userCredential) => {
                    obs.next(userCredential);
                    obs.complete();
                })
                .catch(async (error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const toast = await this.toastCtrl.create({ message: errorMessage, duration: 1500 })
                    await toast.present();
                    obs.error(error);
                    obs.complete();
                });
        })

    }

    login() {
        signInWithEmailAndPassword(this.auth, this.loggedUser.email, this.loggedUser.password).then((userCreds) => {
            this.isLoggedInSubject.next(true);
        }).catch(err => {
            this.isLoggedInSubject.next(false);
        })
    }

    loginWithCredentials(loginCredentials: any) {
        return new Observable(obs => {
            signInWithEmailAndPassword(this.auth, loginCredentials.email, loginCredentials.password).then((userCreds) => {
                this.isLoggedInSubject.next(true);
                obs.next(true);
            }).catch(err => {
                this.isLoggedInSubject.next(false);
                obs.error(err);
            })
        })
    }

    isLoggedIn(): Observable<boolean | null> {
        return this.isLoggedInSubject.asObservable();
    }
}