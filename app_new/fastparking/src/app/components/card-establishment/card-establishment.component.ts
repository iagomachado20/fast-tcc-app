import { Component, OnInit, Input } from '@angular/core';
import { Establishment} from 'src/app/models/user.model';
import { ModalCallPage } from 'src/app/screens/client/modal-call/modal-call.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'card-establishment',
  templateUrl: './card-establishment.component.html',
  styleUrls: ['./card-establishment.component.scss'],
})
export class CardEstablishmentComponent implements OnInit {

  @Input() data: Establishment;
  @Input() componentDetail = ModalCallPage;

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  async openDetail() {

    const modal = await this.modal.create({
      component: ModalCallPage,
      cssClass: 'modal-background',
      swipeToClose: true,
      backdropDismiss: true,
      animated: true,
      showBackdrop: true,
      componentProps: {
        data: this.data
      }
    });

    await modal.present();

  }

}
