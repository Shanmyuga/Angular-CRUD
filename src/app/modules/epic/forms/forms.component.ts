import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {EpicService} from "~services/epic.service";
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
    private epicService: EpicService,
    public snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();
    this.epicService.getDepts().subscribe((data: any) => {
      if(data.success) {
        this.departments = data.data;
      }
    });

    this.epicService.getWorkOrders().subscribe((data: any) => {
      if(data.success) {
        data.data.forEach(d1 => {
          this.options.push(d1._label);
        });

      }
    });

    this.filteredOptions = this.frm.get('workOrder_desc').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  openSnack(data: any) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      custom_user_story_desc: new FormControl(IS_EDITING ? data.custom_user_story_desc : null, [ Validators.minLength(3)]),
      custom_user_story_id: new FormControl(IS_EDITING ? data.custom_user_story_id : null, [ Validators.minLength(3)]),
      workOrder_desc: new FormControl(IS_EDITING ? data.workOrder_desc : null,[Validators.required, Validators.minLength(2)]),

      epic_dept: new FormControl(IS_EDITING ? data.epic_dept : null, [Validators.required, Validators.minLength(2)]),


      standard_epic_id: new FormControl(IS_EDITING ? data.standard_epic_id : null)
    });
  }

  public save(form: FormGroup) {
    console.log(form.value);
    this.epicService.save(form.value).subscribe((data: any) => {
      this.openSnack(data);

      if (data.success) {
        this.dialogRef.close(true);
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  doSomething(event) {
    let dept = this.frm.get('epic_dept').value
    this.epicService.getEpicsByDept(dept).subscribe((data: any) => {
      if(data.success) {
        this.standardEpics = data.data;
        data.data.forEach(d1 => {
          this.standardEpicLabels.push(d1._value);
        });
      }
    });
  }
}
