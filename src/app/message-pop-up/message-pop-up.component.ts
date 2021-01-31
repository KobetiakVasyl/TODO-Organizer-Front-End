import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

interface Data {
  title: string;
  content: string;
  buttonsLabel: {
    reject: string;
    resolve: string;
  }
}

@Component({
  selector: 'app-message-pop-up',
  templateUrl: './message-pop-up.component.html',
  styleUrls: ['./message-pop-up.component.scss']
})
export class MessagePopUpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Data) {
  }
}
