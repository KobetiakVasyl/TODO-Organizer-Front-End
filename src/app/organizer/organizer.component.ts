import {Component, ViewChild, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {OrganizerService} from '../organizer.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {delay, distinctUntilChanged, map, skipWhile} from 'rxjs/operators';

export interface Todo {
  id?: number;
  title: string;
  date: Date;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})

export class OrganizerComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Todo>([]);
  displayedColumns = [
    'index',
    'edit',
    'date',
    'title',
    'description',
    'completed',
    'delete'
  ];

  filterControl = new FormControl('');

  subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private organizerService: OrganizerService) {
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = ((todo: Todo, filter: string) => {
      if (!filter) {
        return;
      }

      return !!(
        todo.title.toLowerCase().includes(filter) ||
        todo.description.toLowerCase().includes(filter)
      );
    });

    this.subscriptions.add(
      this.filterControl.valueChanges
        .pipe(
          distinctUntilChanged(),
          map(value => value.trim().toLowerCase()),
          skipWhile(value => !value),
          delay(300)
        )
        .subscribe(value => this.dataSource.filter = value)
    );

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  add(): void {
    this.organizerService.handleAddTodo().subscribe(response => {
      if (!response) {
        return;
      }

      response.id = this.dataSource.data.length + 1;

      this.dataSource.data.push(response);
      this.dataSource._updateChangeSubscription();
    });
  }

  edit(todo: Todo): void {
    this.organizerService.handleEditTodo(todo).subscribe(response => {
      if (!response) {
        return;
      }
      const i = this.dataSource.data.findIndex(({id}) => id === response.id);

      this.dataSource.data[i].title = response.title;
      this.dataSource.data[i].description = response.description;
      this.dataSource.data[i].completed = response.completed;

      this.dataSource._updateChangeSubscription();
    });
  }

  remove(i: number): void {
    const viewNumber = i + 1;

    this.organizerService.handleRemoveTodo(viewNumber).subscribe(response => {
      if (!response) {
        return;
      }

      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  getRealIndex(i: number): number {
    return this.dataSource.paginator
      ? this.organizerService
        .getRealIndex(i, this.dataSource.paginator.pageSize, this.dataSource.paginator.pageIndex)
      : i;
  }
}
