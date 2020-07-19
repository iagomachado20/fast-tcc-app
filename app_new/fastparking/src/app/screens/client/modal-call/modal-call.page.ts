import { Component, OnInit, Input } from '@angular/core';
import { Establishment } from 'src/app/models/user.model';

@Component({
  selector: 'app-modal-call',
  templateUrl: './modal-call.page.html',
  styleUrls: ['./modal-call.page.scss'],
})
export class ModalCallPage implements OnInit {

  @Input() data: Establishment;
  dateNow = new Date().toISOString();
  valuePayment = 0;

  constructor() {}

  ngOnInit() {

    console.log(this.data);

  }

}
