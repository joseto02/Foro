import { Component, OnInit } from '@angular/core';
import { ServiciobdService } from 'src/app/services/serviciobd.service';

@Component({
  selector: 'app-admin-foro',
  templateUrl: './admin-foro.page.html',
  styleUrls: ['./admin-foro.page.scss'],
})
export class AdminForoPage implements OnInit {

  foros: any = [];

  constructor(private bd:ServiciobdService) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchForo().subscribe(res => {
          this.foros = res;
        })
      }
    })
  }

  eliminarForo(x: any) {
    this.bd.eliminarForo(x.id_foro);
  }

}
