"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.FormsComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var snackbar_component_1 = require("../../../components/snackbar/snackbar.component");
var FormsComponent = /** @class */ (function () {
    function FormsComponent(dialogRef, data, fb, backLogService, snack) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.backLogService = backLogService;
        this.snack = snack;
    }
    FormsComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    FormsComponent.prototype.ngOnInit = function () {
        this.initializeForm();
    };
    FormsComponent.prototype.openSnack = function (data) {
        this.snack.openFromComponent(snackbar_component_1.SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    };
    FormsComponent.prototype.initializeForm = function () {
        console.log("initialize called");
        var IS_EDITING = this.data.action === 'edit';
        var data = this.data.data;
        console.log(IS_EDITING);
        console.log(data);
        this.frm = this.fb.group({
            user_story_desc: new forms_1.FormControl(IS_EDITING ? data[0]._user_story_task : null, [forms_1.Validators.minLength(3)]),
            user_story_id: new forms_1.FormControl(IS_EDITING ? data[0]._user_story_id : null, [forms_1.Validators.minLength(3)]),
            dept_id: new forms_1.FormControl(IS_EDITING ? data[0]._dept_id : null, [forms_1.Validators.required, forms_1.Validators.minLength(2)]),
            epic_desc: new forms_1.FormControl(IS_EDITING ? data[0]._epic_desc : null, [forms_1.Validators.required, forms_1.Validators.minLength(2)]),
            epic_id: new forms_1.FormControl(IS_EDITING ? data[0]._epic_id : null)
        });
    };
    FormsComponent.prototype.save = function (form) {
    };
    FormsComponent.prototype.editForm = function (form) {
    };
    FormsComponent = __decorate([
        core_1.Component({
            selector: 'app-forms',
            templateUrl: './forms.component.html',
            styleUrls: ['./forms.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], FormsComponent);
    return FormsComponent;
}());
exports.FormsComponent = FormsComponent;
