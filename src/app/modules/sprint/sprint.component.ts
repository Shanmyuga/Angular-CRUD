import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {AuthService} from "~services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "~components/snackbar/snackbar.component";
import {ConfirmComponent} from "~components/confirm/confirm.component";
import {merge, Observable, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {FormsComponent} from "~modules/sprint/forms/forms.component";
import {Sprintcontroller} from "~base/sprintcontroller";
import {sprintResponse} from "~models/sprintResponse";
import {SprintService} from "~services/sprint.service";

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  providers:[SprintService]
})
export class SprintComponent  implements AfterViewInit, OnInit, Sprintcontroller {
  public displayedColumns = ['_dept_id', '_epic_desc', '_user_story_id', '_user_story_task', '_job_desc', '_seq_work_id', '_epic_status','_assigned_to','_comments', '_seq_sprint_job_id'];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource = new MatTableDataSource();
  public pageEvent: PageEvent;
  public resultsLength = 0;
  public page = 1;
  public isLoading = false;
  public isTotalReached = false;
  public totalItems = 0;
  public searchByDept = '';
  public departments: any[];
  public sprintNames: any[];
  public searchBySprint = '';
  public standardEpics: any[];
  public deptEpics: any[];
  public role = false;
  options:  string[] = new Array();
  standardEpicLabels:  string[] = new Array();
  epicLabels:  string[] = new Array();
  filteredOptions: Observable<string[]>;
  ngAfterViewInit(): void {
    // ANTES QUE LA VISTA CARGUE INICIA LA CARGA DE DATOS EN EL GRID
   // this.getData();
  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private sprintService: SprintService,
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
    this.sprintService.getDepts().subscribe((data: any) => {
      if(data.success) {
        this.departments = data.data;
      }
    });
    this.authService.checkPMRole().subscribe((data: any) => {
      if(data.success) {
        this.role = true;
      }
    });


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
      data: {data: data},
      duration: 3000
    });
  }

  delete(sprintResponse: sprintResponse): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'Delete record',
        message: 'Are you sure you want to delete this record?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sprintService.deleteData(sprintResponse._seq_sprint_job_id).subscribe((data: any) => {
          this.openSnack(data);
          if (data.success) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }

  updateBackLog(sprintResponse: sprintResponse): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'Update record',
        message: 'Are you sure you want to return the story to BackLog this record ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sprintService.updateSprintToBackLog(sprintResponse).subscribe((data: any) => {
          this.openSnack(data);
          if (data.success) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }

  closeStory(sprintResponse: sprintResponse): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'Update record ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      message: 'Are you sure you want to close the story'
      if (result) {
        this.sprintService.closeStory(sprintResponse).subscribe((data: any) => {
          this.openSnack(data);
          if (data.success) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }
  edit(sprintResponse: sprintResponse): void {

  }

  getData(): void {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.sprintService.getList(
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
            this.searchBySprint

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

  save(): void {

  }





  doLoadSprints(event) {
    this.sprintService.getSprintByDept(this.searchByDept).subscribe((data: any) => {
      if(data.success) {
        this.sprintNames = data.data;
      }
    });
  }

  doLoadSprintData(event) {
   this.getData();
  }

  updateStory(sprintResponse: sprintResponse): void {
    console.log(sprintResponse);
    this.sprintService.getOneData(sprintResponse._seq_sprint_job_id).subscribe((data: any) => {
      if (data.success) {
        const dialogRef = this.dialog.open(FormsComponent, {
          width: '75%',
          data: { title: 'Update Sprint Story', action: 'edit', data: data.data }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  }
}
