import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {BacklogService} from "~services/backlog.service";
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  public frm: FormGroup;

  public departments: any[];
  public standardEpics: any[];
  options:  string[] = new Array();
  standardEpicLabels:  string[] = new Array();
  filteredOptions: Observable<string[]>;
  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private backLogService: BacklogService,
    public snack: MatSnackBar
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();


  }

  openSnack(data: any) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: {data: data},
      duration: 3000
    });
  }

  private initializeForm() {
    console.log("initialize called");
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;
    console.log(IS_EDITING);
    console.log(data);
    this.frm = this.fb.group({
      user_story_desc: new FormControl(IS_EDITING ? data[0]._user_story_task : null, [Validators.minLength(3)]),
      user_story_id: new FormControl(IS_EDITING ? data[0]._user_story_id : null, [Validators.minLength(3)]),
      dept_id: new FormControl(IS_EDITING ? data[0]._dept_id : null, [Validators.required, Validators.minLength(2)]),

      epic_desc: new FormControl(IS_EDITING ? data[0]._epic_desc : null, [Validators.required, Validators.minLength(2)]),


      epic_id: new FormControl(IS_EDITING ? data[0]._epic_id : null)
    });
  }

  public save(form: FormGroup) {

  }

  public editForm(form: FormGroup) {

  }

}
