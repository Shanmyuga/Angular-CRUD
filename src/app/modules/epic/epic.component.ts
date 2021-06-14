import {Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import {merge, Observable, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { epic } from '~models/epicstory';
import { epicResponse } from '~models/epicResponse';
import { AuthService } from '~services/auth.service';
import { ConfirmComponent } from '~components/confirm/confirm.component';
import { FormsComponent } from '~modules/epic/forms/forms.component';
import { CustomepicComponent } from '~modules/epic/customepic/customepic.component';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';
import {EpicService} from "~services/epic.service";

import {Controller} from "~base/epiccontroller";

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
  providers: [EpicService]
})
export class EpicComponent implements AfterViewInit, OnInit, Controller {
  public displayedColumns = ['_dept_id','_epic_id', '_epic_desc', '_user_story_id', '_user_story_task','seq_epic_id'];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource = new MatTableDataSource();
  public pageEvent: PageEvent;
  public resultsLength = 0;
  public page = 1;
  public isLoading = false;
  public isTotalReached = false;
  public totalItems = 0;
  public search = '';

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private epicService: EpicService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {


  }

  ngOnInit() {
    if (!this.authService.loggedIn.getValue()) {
      this.router.navigate(['/login']);
    }




  }

  ngAfterViewInit() {
    // ANTES QUE LA VISTA CARGUE INICIA LA CARGA DE DATOS EN EL GRID
    this.getData();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }


  public onPaginateChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.page = 1;
    this.getData();
  }
  private openSnack(data: any): void {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  getData(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.epicService.getList(
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
            this.search
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isTotalReached = false;
          this.totalItems = data.total;
          return data.data;
        }),
        catchError(() => {
          this.isLoading = false;
          this.isTotalReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  edit(epicResponse: epicResponse): void {
    this.epicService.getEpicForEdit(epicResponse._user_story_id).subscribe((data: any) => {
      if (data.success) {
        const dialogRef = this.dialog.open(CustomepicComponent, {
          width: '75%',
          data: { title: 'Update Epics', action: 'edit', data: data.data }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }

  save(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '80%',
      data: { title: 'Add Epic', action: 'save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    });
  }
  saveCustom(): void {
    const dialogRef = this.dialog.open(CustomepicComponent, {
      width: '80%',
      data: { title: 'Add Custom Epic', action: 'save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    });
  }
  delete(epicResponse: epicResponse): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'Delete record',
        message: 'Are you sure you want to delete this record?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.epicService.delete(epicResponse._user_story_id).subscribe((data: any) => {
          this.openSnack(data);
          if (data.success) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }


}
