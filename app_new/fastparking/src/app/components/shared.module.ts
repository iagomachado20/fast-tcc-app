import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { CardEstablishmentComponent } from './card-establishment/card-establishment.component';
import { FilterList } from '../pipes/filter.list.pipe';

const COMPONENTS = [
  StarRatingComponent,
  MenuButtonComponent,
  LogoComponent,
  HeaderComponent,
  CardEstablishmentComponent
];

const PIPES = [
  FilterList
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  entryComponents: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SharedComponentsModule {}
