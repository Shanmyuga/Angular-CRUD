"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BacklogComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var backlog_service_1 = require("~services/backlog.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var forms_component_1 = require("~modules/backlog/forms/forms.component");
var snackbar_component_1 = require("~components/snackbar/snackbar.component");
var confirm_component_1 = require("~components/confirm/confirm.component");
var BacklogComponent = /** @class */ (function () {
    function BacklogComponent(changeDetectorRef, backLogService, authService, router, dialog, snack) {
        this.changeDetectorRef = changeDetectorRef;
        this.backLogService = backLogService;
        this.authService = authService;
        this.router = router;
        this.dialog = dialog;
        this.snack = snack;
        this.displayedColumns = ['_dept_id', '_epic_desc', '_user_story_id', '_user_story_task', '_job_desc', '_seq_work_id', '_epic_status', '_seq_backlog_id'];
        this.pageSizeOptions = [5, 10, 20, 40, 100];
        this.pageSize = 20;
        this.dataSource = new table_1.MatTableDataSource();
        this.resultsLength = 0;
        this.page = 1;
        this.isLoading = false;
        this.isTotalReached = false;
        this.totalItems = 0;
        this.searchByDept = '';
        this.searchByDesc = '';
        this.searchByWork = '';
    }
    BacklogComponent.prototype.ngAfterViewInit = function () {
        // ANTES QUE LA VISTA CARGUE INICIA LA CARGA DE DATOS EN EL GRID
        this.getData();
    };
    BacklogComponent.prototype.ngOnInit = function () {
        if (!this.authService.loggedIn.getValue()) {
            this.router.navigate(['/login']);
        }
    };
    BacklogComponent.prototype.ngAfterViewChecked = function () {
        this.changeDetectorRef.detectChanges();
    };
    BacklogComponent.prototype.onPaginateChange = function (event) {
        this.page = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getData();
    };
    BacklogComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim().toLowerCase();
        this.page = 1;
        this.getData();
    };
    BacklogComponent.prototype.openSnack = function (data) {
        this.snack.openFromComponent(snackbar_component_1.SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    };
    BacklogComponent.prototype["delete"] = function (backlogResponse) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            width: '250px',
            data: {
                title: 'Delete record',
                message: 'Are you sure you want to delete this record?'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.backLogService["delete"](backlogResponse._seq_backlog_id).subscribe(function (data) {
                    _this.openSnack(data);
                    if (data.success) {
                        _this.paginator._changePageSize(_this.paginator.pageSize);
                    }
                });
            }
        });
    };
    BacklogComponent.prototype.edit = function (backlogResponse) {
    };
    BacklogComponent.prototype.getData = function () {
        var _this = this;
        this.sort.sortChange.subscribe(function () { return _this.paginator.pageIndex = 0; });
        rxjs_1.merge(this.sort.sortChange, this.paginator.page)
            .pipe(operators_1.startWith({}), operators_1.switchMap(function () {
            _this.isLoading = true;
            return _this.backLogService.getList(_this.sort.active, _this.sort.direction, _this.pageSize, _this.page, _this.searchByDept, _this.searchByDesc, _this.searchByWork);
        }), operators_1.map(function (data) {
            _this.isLoading = false;
            _this.isTotalReached = false;
            _this.totalItems = data.total;
            return data.data;
        }), operators_1.catchError(function () {
            _this.isLoading = false;
            _this.isTotalReached = true;
            return rxjs_1.of([]);
        })).subscribe(function (data) { return _this.dataSource.data = data; });
    };
    BacklogComponent.prototype.save = function () {
    };
    BacklogComponent.prototype.addToSprint = function (backlogResponse) {
        var _this = this;
        console.log(backlogResponse);
        this.backLogService.getOne(backlogResponse._seq_backlog_id).subscribe(function (data) {
            if (data.success) {
                var dialogRef = _this.dialog.open(forms_component_1.FormsComponent, {
                    width: '75%',
                    data: { title: 'Add to Sprint', action: 'edit', data: data.data }
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        _this.paginator._changePageSize(_this.paginator.pageSize);
                    }
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: false })
    ], BacklogComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: false })
    ], BacklogComponent.prototype, "sort");
    BacklogComponent = __decorate([
        core_1.Component({
            selector: 'app-backlog',
            templateUrl: './backlog.component.html',
            styleUrls: ['./backlog.component.css'],
            providers: [backlog_service_1.BacklogService]
        })
    ], BacklogComponent);
    return BacklogComponent;
}());
exports.BacklogComponent = BacklogComponent;
