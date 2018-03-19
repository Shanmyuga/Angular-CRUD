import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError} from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { Person } from '../../models/Person';
import { PersonService } from '../../services/person.service';

// DIALOGS
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { FormsComponent } from './forms/forms.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements AfterViewInit {
    displayedColumns = ['name','age','gender', 'personid'];
    dataSource = new MatTableDataSource();

    resultsLength = 0;

    pageEvent: PageEvent;
    pageSizeOptions = [5, 10, 25, 100];
    pageSize = 5;
    page = 1;
    isLoading = false;
    isTotalReached = false;
    totalItems = 0;
    search = '';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private cdr:ChangeDetectorRef,
        private personService: PersonService,
        public dialog: MatDialog,
        public snack: MatSnackBar
    ) { }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.getData();
    }

    ngAfterViewChecked(){
        this.cdr.detectChanges();
    }

    openSnack(data) {
        this.snack.openFromComponent(SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    }

    onPaginateChange(event){
        this.page = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getData();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.search = filterValue;
        this.getData();
      }

    // GET PERSONS
    getData() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.isLoading = true;
                return this.personService!.getList(this.sort.direction, this.pageSize, this.page, this.search);
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

    // EDIT PERSONS
    edit(row:Person):void {
        let dialogRef = this.dialog.open(FormsComponent, {
            height: '350px',
            width: '600px',
            data: { title: 'MODIFICAR REGISTRO', action: 'edit', data:row}
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result)
                this.paginator._changePageSize(this.paginator.pageSize);
        });
    }

    // SAVE PERSONS
    save():void {
        let dialogRef = this.dialog.open(FormsComponent, {
            height: '350px',
            width: '600px',
            data: { title: 'AGREGAR REGISTRO', action: 'save'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result)
                this.paginator._changePageSize(this.paginator.pageSize);
        });
    }

    // DELETE PERSONS
    delete(row:Person){
        let dialogRef = this.dialog.open(ConfirmComponent, {
            width: '250px',
            data: { 
                title: 'Confirme la acción',
                message: '¿Seguro que desea eliminar este registro?'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.personService.delete(row.personid).subscribe((data:any) => {
                    if(data.success){
                        this.paginator._changePageSize(this.paginator.pageSize);
                        this.openSnack(data);
                    }else{
                        this.openSnack(data);
                    }
                });
            }
        });
    }

}