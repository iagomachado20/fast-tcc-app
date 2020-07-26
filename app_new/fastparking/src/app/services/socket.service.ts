import { PayloadLogin } from 'src/app/models/errors.model';
import { environment } from '../../environments/environment.prod';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy{

  senderDataSocket = new Subject();

  constructor(
    private socket: Socket
  ) {

    this.socket.connect();
    console.log(`Connection socket on-line`);

  }

  listenCallRequest() {
    this.socket.on('requestUserVacancy', (result) => {

      this.senderDataSocket.next(result);

    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

}
