import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {I18nModule} from "./app/i18n.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ScrollingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    I18nModule,
    FontAwesomeModule,
  ]
})
export class SbModule {}
