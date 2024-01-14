 import { AuthenticationService } from "../services/authentication.service";
 import { filter, map } from "rxjs";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";

export function canActivate() {
    const router = inject(Router);
    const toast = inject(ToastService);
    return inject(AuthenticationService).isLoggedIn().pipe(filter(res => res !== null), map(res =>{
        return res || router.navigate(['/login']).then(()=>{
            toast.showErrorToast('can not login');
        });
    }))
}