"use strict";
// CONTIENE TODOS LOS MODULOS DE ANGULAR MATERIAL
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaterialComponentsModule = void 0;
var core_1 = require("@angular/core");
var autocomplete_1 = require("@angular/material/autocomplete");
var button_1 = require("@angular/material/button");
var button_toggle_1 = require("@angular/material/button-toggle");
var card_1 = require("@angular/material/card");
var checkbox_1 = require("@angular/material/checkbox");
var chips_1 = require("@angular/material/chips");
var core_2 = require("@angular/material/core");
var datepicker_1 = require("@angular/material/datepicker");
var dialog_1 = require("@angular/material/dialog");
var divider_1 = require("@angular/material/divider");
var expansion_1 = require("@angular/material/expansion");
var grid_list_1 = require("@angular/material/grid-list");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var list_1 = require("@angular/material/list");
var menu_1 = require("@angular/material/menu");
var paginator_1 = require("@angular/material/paginator");
var progress_bar_1 = require("@angular/material/progress-bar");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var radio_1 = require("@angular/material/radio");
var select_1 = require("@angular/material/select");
var sidenav_1 = require("@angular/material/sidenav");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var slider_1 = require("@angular/material/slider");
var snack_bar_1 = require("@angular/material/snack-bar");
var sort_1 = require("@angular/material/sort");
var stepper_1 = require("@angular/material/stepper");
var table_1 = require("@angular/material/table");
var tabs_1 = require("@angular/material/tabs");
var toolbar_1 = require("@angular/material/toolbar");
var tooltip_1 = require("@angular/material/tooltip");
var MaterialComponentsModule = /** @class */ (function () {
    function MaterialComponentsModule() {
    }
    MaterialComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                autocomplete_1.MatAutocompleteModule,
                button_1.MatButtonModule,
                button_toggle_1.MatButtonToggleModule,
                card_1.MatCardModule,
                checkbox_1.MatCheckboxModule,
                chips_1.MatChipsModule,
                datepicker_1.MatDatepickerModule,
                dialog_1.MatDialogModule,
                divider_1.MatDividerModule,
                expansion_1.MatExpansionModule,
                grid_list_1.MatGridListModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
                list_1.MatListModule,
                menu_1.MatMenuModule,
                core_2.MatNativeDateModule,
                paginator_1.MatPaginatorModule,
                progress_bar_1.MatProgressBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                radio_1.MatRadioModule,
                core_2.MatRippleModule,
                select_1.MatSelectModule,
                sidenav_1.MatSidenavModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                snack_bar_1.MatSnackBarModule,
                sort_1.MatSortModule,
                stepper_1.MatStepperModule,
                table_1.MatTableModule,
                tabs_1.MatTabsModule,
                toolbar_1.MatToolbarModule,
                tooltip_1.MatTooltipModule
            ],
            exports: [
                autocomplete_1.MatAutocompleteModule,
                button_1.MatButtonModule,
                button_toggle_1.MatButtonToggleModule,
                card_1.MatCardModule,
                checkbox_1.MatCheckboxModule,
                chips_1.MatChipsModule,
                datepicker_1.MatDatepickerModule,
                dialog_1.MatDialogModule,
                divider_1.MatDividerModule,
                expansion_1.MatExpansionModule,
                grid_list_1.MatGridListModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
                list_1.MatListModule,
                menu_1.MatMenuModule,
                core_2.MatNativeDateModule,
                paginator_1.MatPaginatorModule,
                progress_bar_1.MatProgressBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                radio_1.MatRadioModule,
                core_2.MatRippleModule,
                select_1.MatSelectModule,
                sidenav_1.MatSidenavModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                snack_bar_1.MatSnackBarModule,
                sort_1.MatSortModule,
                stepper_1.MatStepperModule,
                table_1.MatTableModule,
                tabs_1.MatTabsModule,
                toolbar_1.MatToolbarModule,
                tooltip_1.MatTooltipModule
            ]
        })
    ], MaterialComponentsModule);
    return MaterialComponentsModule;
}());
exports.MaterialComponentsModule = MaterialComponentsModule;
