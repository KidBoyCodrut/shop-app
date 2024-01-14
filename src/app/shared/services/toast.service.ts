import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private readonly toastCtrl: ToastController) {

    }

    async showErrorToast(message: string): Promise<void> {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 3000, // Display for 3 seconds
            color: 'danger', // Use the danger color for error messages
            position: 'bottom', // Display at the top of the screen
        });

        toast.present();
    }


    async showSuccessToast(message: string): Promise<void> {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 3000, // Display for 3 seconds
            color: 'success', // Use the danger color for error messages
            position: 'bottom', // Display at the top of the screen
        });

        toast.present();
    }
}