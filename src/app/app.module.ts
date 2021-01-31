import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";

import {AppComponent} from './app.component';
import {OrganizerComponent} from './organizer/organizer.component';
import {TodoPopUpComponent} from './todo-pop-up/todo-pop-up.component';
import {MessagePopUpComponent} from './message-pop-up/message-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    TodoPopUpComponent,
    MessagePopUpComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    FlexModule,
    FlexLayoutModule
  ],
  entryComponents: [
    TodoPopUpComponent,
    MessagePopUpComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
