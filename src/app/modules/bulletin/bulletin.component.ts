import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {AuthService} from "~services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "~components/snackbar/snackbar.component";
import {merge, Observable, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {BulletinCont} from "~base/bulletincont";
import {deptMessResponse} from "~models/deptmessresponse";
import {BulletinService} from "~services/bulletin.service";
import {EpicService} from "~services/epic.service";
import {FormsComponent} from "~modules/bulletin/forms/forms.component";
import {Download} from "~services/download";
import {CustomepicComponent} from "~modules/epic/customepic/customepic.component";
import {AckformComponent} from "~modules/bulletin/ackform/ackform.component";
import {AckCommentsComponent} from "~modules/bulletin/ackcomments/ackcomments.component";
@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.css'],
  providers:[BulletinService]
})
export class BulletinComponent implements AfterViewInit, OnInit, BulletinCont {
  public displayedColumns = [ '_job_desc', '_dept_message', '_dept_assigned_to',  '_dept_created_by','_dept_created_date', '_target_date','_ack_by','_ack_comments','_original_fileName','_seq_dept_mess_id'];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource = new MatTableDataSource();
  public pageEvent: PageEvent;
  download$: Observable<Download>
  public resultsLength = 0;
  public page = 1;
  public isLoading = false;
  public isTotalReached = false;
  public totalItems = 0;
  public searchByDept = '';
  public searchByAckStatus = ''
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
    this.getData();
  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private bulletinService: BulletinService,
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
    this.epicService.getDepts().subscribe((data: any) => {
      if(data.success) {
        this.departments = data.data;
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

  delete(deptMessResponse: deptMessResponse): void {
  }
  doLoadSprints(event) {
   this.getData();
  }


  edit(deptMessResponse: deptMessResponse): void {
    console.log(deptMessResponse._original_fileName);
    console.log(deptMessResponse._seq_dept_mess_id);
     this.download$ =  this.bulletinService.openFile(deptMessResponse);
  }

  getData(): void {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.bulletinService.getList(
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
            this.searchByDept,
            this.searchByAckStatus

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
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '75%',
      data: { title: 'Add Bulletin', action: 'save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    });

  }
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  ack(deptMessResponse: deptMessResponse): void {
    this.bulletinService.getOneData(deptMessResponse._seq_dept_mess_id).subscribe((data: any) => {
      if (data.success) {
        const dialogRef = this.dialog.open(AckformComponent, {
          width: '75%',
          data: { title: 'Update Acknowledgement', action: 'edit', data: data.data }
        });


      }
    });
  }

  viewMessage(deptMessResponse: deptMessResponse): void {
    this.bulletinService.getOneData(deptMessResponse._seq_dept_mess_id).subscribe((data: any) => {
      if (data.success) {
        const dialogRef = this.dialog.open(AckCommentsComponent, {
          width: '75%',
          data: { title: 'View Message', action: 'viewMessage', data: data.data }
        });


      }
    });
  }


  viewAck(deptMessResponse: deptMessResponse): void {
    this.bulletinService.getOneData(deptMessResponse._seq_dept_mess_id).subscribe((data: any) => {
      if (data.success) {
        const dialogRef = this.dialog.open(AckCommentsComponent, {
          width: '75%',
          data: { title: 'View AckMessage', action: 'viewAck', data: data.data }
        });


      }
    });
  }
}
