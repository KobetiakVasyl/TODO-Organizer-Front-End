import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EMPTY, Observable} from "rxjs";
import {TodoPopUpComponent} from "./todo-pop-up/todo-pop-up.component";
import {MessagePopUpComponent} from "./message-pop-up/message-pop-up.component";
import {Todo} from "./organizer/organizer.component";

@Injectable({providedIn: 'root'})
export class OrganizerService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'first',
      description: 'asdqwe',
      completed: false
    },
    {
      id: 2,
      title: 'second',
      description: 'asdqweasdqwe',
      completed: false
    },
    {
      id: 3,
      title: 'third',
      description: 'asdqweasdqweasdqwe',
      completed: true
    }
  ];

  constructor(private dialog: MatDialog) {
  }

  handleAddTodo(): Observable<Todo> {
    const dialogRef = this.dialog.open(TodoPopUpComponent, {
      minWidth: '500px',
      data: {
        isEditing: false,
        buttonsLabelResolve: 'Create'
      }
    });

    return dialogRef.afterClosed();
  }

  handleEditTodo(todo: Todo): Observable<any> {
    const dialogRef = this.dialog.open(TodoPopUpComponent, {
      minWidth: '500px',
      data: {
        isEditing: true,
        buttonsLabelResolve: 'Save',
        todo
      }
    });

    return dialogRef.afterClosed();
  }

  handleRemoveTodo(i: number): Observable<boolean> {
    const dialogRef = this.dialog.open(MessagePopUpComponent, {
      minWidth: '500px',
      data: {
        title: 'Warning!',
        content: `TODO with number: ${i} will be deleted. Continue?`,
        buttonsLabel: {
          reject: 'No',
          resolve: 'Yes'
        }
      }
    });

    return dialogRef.afterClosed();
  }

  getRealIndex(i: number, pageSize: number, pageIndex: number): number {
    return (pageIndex * pageSize) + i;
  }
}
