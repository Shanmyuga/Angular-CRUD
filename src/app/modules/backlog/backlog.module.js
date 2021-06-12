"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BacklogModule = void 0;
var core_1 = require("@angular/core");
var forms_component_1 = require("./forms/forms.component");
var select_check_all_component_1 = require("./select-check-all/select-check-all.component");
var router_1 = require("@angular/router");
var backlog_component_1 = require("../backlog/backlog.component");
var shared_module_1 = require("../../utils/shared.module");
var BacklogModule = /** @class */ (function () {
    function BacklogModule() {
    }
    BacklogModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([{ path: '', component: backlog_component_1.BacklogComponent }]),
                shared_module_1.SharedModule
            ],
            declarations: [
                backlog_component_1.BacklogComponent,
                forms_component_1.FormsComponent,
                select_check_all_component_1.SelectCheckAllComponent
            ],
            providers: [],
            entryComponents: [
                forms_component_1.FormsComponent
            ],
            exports: [
                router_1.RouterModule,
            ]
        })
    ], BacklogModule);
    return BacklogModule;
}());
exports.BacklogModule = BacklogModule;
