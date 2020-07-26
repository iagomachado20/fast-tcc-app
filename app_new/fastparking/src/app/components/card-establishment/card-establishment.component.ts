import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Establishment} from 'src/app/models/user.model';
import { ModalCallPage } from 'src/app/screens/client/modal-call/modal-call.page';
import { ModalController } from '@ionic/angular';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'card-establishment',
  templateUrl: './card-establishment.component.html',
  styleUrls: ['./card-establishment.component.scss'],
})
export class CardEstablishmentComponent implements OnInit {

  @Input() data: Establishment;
  @Output() clickedCard = new EventEmitter<HTMLIonModalElement>();

  constructor(
    private modal: ModalController,
    private mapService: MapService
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

    this.clickedCard.emit(modal);

  }

}
