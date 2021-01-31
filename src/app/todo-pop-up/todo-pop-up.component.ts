import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../organizer/organizer.component";

interface Data {
  isEditing: boolean;
  buttonsLabelResolve: string;
  todo?: Todo;
}

@Component({
  selector: 'app-todo-pop-up',
  templateUrl: './todo-pop-up.component.html',
  styleUrls: ['./todo-pop-up.component.scss']
})
export class TodoPopUpComponent implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    completed: new FormControl(false)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<TodoPopUpComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.data.isEditing) {
      this.formGroup.patchValue(this.data.todo);
    }
  }

  submit(): void {
    if (this.formGroup.invalid) return;

    this.dialogRef.close(this.formGroup.value);
  }
}
