import { Component, Input } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {

  @Input() type = '';

  constructor(private util: UtilService) {}

  openMenu() {

    this.util.submitEventMenu.next(true);

  }

}
