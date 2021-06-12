"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
/*CONTIENE LOS MODULOS DE ANGULAR QUE SON IMPORTADOS EN TODOS LOS MODULOS
CREADOS POR EL USUARIO*/
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var flex_layout_1 = require("@angular/flex-layout");
var material_module_1 = require("./material.module");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule,
                forms_1.ReactiveFormsModule,
                material_module_1.MaterialComponentsModule,
                progress_spinner_1.MatProgressSpinnerModule
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule,
                forms_1.ReactiveFormsModule,
                material_module_1.MaterialComponentsModule
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
