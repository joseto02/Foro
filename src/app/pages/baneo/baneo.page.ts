import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-baneo',
  templateUrl: './baneo.page.html',
  styleUrls: ['./baneo.page.scss'],
})
export class BaneoPage implements OnInit {
  users = [
    { id: 1, name: 'Daryenfenix', isAdmin: false, isBanned: false },
    { id: 2, name: 'joseto', isAdmin: true, isBanned: false },
    { id: 3, name: 'Estebandido', isAdmin: false, isBanned: true },
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async toggleAdmin(user: any) {
    const action = user.isAdmin ? 'revocar' : 'dar';
    const alert = await this.alertController.create({
      header: `¿Quieres ${action} permisos de administrador a ${user.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            user.isAdmin = !user.isAdmin;
            this.presentToast(`Permisos de administrador ${action}dos`);
          },
        },
      ],
    });
    await alert.present();
  }

  async toggleBan(user: any) {
    const action = user.isBanned ? 'desbanear' : 'banear';
    const alert = await this.alertController.create({
      header: `¿Quieres ${action} a ${user.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            user.isBanned = !user.isBanned;
            this.presentToast(`${user.name} ha sido ${action}do`);
          },
        },
      ],
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });
    toast.present();
  }
}
