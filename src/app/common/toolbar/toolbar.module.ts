import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { CommonMaterialModule } from '../material/common-material.module';

@NgModule({
  imports: [
    CommonMaterialModule
  ],
  exports: [
    ToolbarComponent
  ],
  declarations: [
    ToolbarComponent
  ],
  providers: [],
})

export class ToolbarModule {
}
