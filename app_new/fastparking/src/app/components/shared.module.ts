import { NgModule } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LogoComponent
  ],
  entryComponents: [
    LogoComponent
  ],
  exports: [
    LogoComponent
  ]
})
export class SharedComponentsModule {}
