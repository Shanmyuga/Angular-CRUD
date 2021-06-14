import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Controller} from "~base/epiccontroller";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BacklogService} from "~services/backlog.service";
import {AuthService} from "~services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BackLogController} from "~base/backlogcontroller";
import {backlog} from "~models/backlog";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {BackLogProvider} from "~base/backlogprovider";
import {SnackbarComponent} from "~components/snackbar/snackbar.component";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  providers: [BacklogService]
})
export class BacklogComponent implements AfterViewInit, OnInit, BackLogController {
  public displayedColumns = ['_dept_id', '_epic_desc', '_user_story_id', '_user_story_task','_job_desc','_seq_work_id','_epic_status','_seq_backlog_id'];
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
  public searchByDesc = '';
  public searchByWork = '';
  ngAfterViewInit(): void {
    // ANTES QUE LA VISTA CARGUE INICIA LA CARGA DE DATOS EN EL GRID
    this.getData();
    }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private backLogService: BacklogService,
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

  delete(backlog: backlog): void {
  }

  edit(backlog: backlog): void {
  }

  getData(): void {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.backLogService.getList(
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
            this.searchByDept,
            this.searchByDesc,
            this.searchByWork
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

}
