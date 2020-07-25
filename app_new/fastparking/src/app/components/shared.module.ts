import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';

const COMPONENTS = [
  StarRatingComponent,
  MenuButtonComponent,
  LogoComponent,
  HeaderComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  entryComponents: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedComponentsModule {}
