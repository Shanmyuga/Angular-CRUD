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
exports.CustomepicComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var snackbar_component_1 = require("~components/snackbar/snackbar.component");
var CustomepicComponent = /** @class */ (function () {
    function CustomepicComponent(dialogRef, data, fb, epicService, snack) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.epicService = epicService;
        this.snack = snack;
    }
    CustomepicComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CustomepicComponent.prototype.ngOnInit = function () {
        this.initializeForm();
    };
    CustomepicComponent.prototype.openSnack = function (data) {
        this.snack.openFromComponent(snackbar_component_1.SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    };
    CustomepicComponent.prototype.initializeForm = function () {
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
    CustomepicComponent.prototype.save = function (form) {
    };
    CustomepicComponent.prototype.editForm = function (form) {
    };
    CustomepicComponent = __decorate([
        core_1.Component({
            selector: 'app-customepic',
            templateUrl: './customepic.component.html',
            styleUrls: ['./customepic.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], CustomepicComponent);
    return CustomepicComponent;
}());
exports.CustomepicComponent = CustomepicComponent;
