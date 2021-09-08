import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EpicService} from "~services/epic.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map, startWith} from "rxjs/operators";
import {SnackbarComponent} from "~components/snackbar/snackbar.component";
import {BulletinService} from "~services/bulletin.service";
import { MAT_DATE_FORMATS } from '@angular/material/core';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
    providers: [
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
]

})
export class FormsComponent implements OnInit {
  public frm: FormGroup;

  public departments: any[];
  public standardEpics: any[];

  public deptEpics: any[];
  options:  string[] = new Array();
  standardEpicLabels:  string[] = new Array();
  epicLabels:  string[] = new Array();
  filteredOptions: Observable<string[]>;
  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private bulletinService: BulletinService,
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
    console.log("initialize called");
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;
    console.log(IS_EDITING);
    console.log(data);
    this.frm = this.fb.group({
      workOrder_desc: new FormControl(IS_EDITING ? data[0]._workOrder_desc : null, [ Validators.required,Validators.minLength(10)]),
      dept_assigned_to: new FormControl(IS_EDITING ? data[0]._dept_assigned_to : null, [ Validators.required,Validators.minLength(2)]),
      target_date: new FormControl(IS_EDITING ? data[0]._target_date : null,[Validators.required, Validators.minLength(2)]),
      message: new FormControl(IS_EDITING ? data.message : null,[Validators.required, Validators.minLength(20)]),
      attachments: new FormControl(IS_EDITING ? data.attachments : null)



    });
  }
  upload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.frm.patchValue({
      attachments: file
    });
    this.frm.get('attachments').updateValueAndValidity()
  }
  public save(form: FormGroup) {
    console.log(form.value);

    const formData = new FormData();
    formData.append("test",form.get('attachments').value);
    formData.append("message",form.get('message').value);
    formData.append('target_date',form.get('target_date').value);
    formData.append('workOrder_desc',form.get('workOrder_desc').value);
    formData.append('dept_assigned_to',form.get('dept_assigned_to').value);

    this.bulletinService.saveFormData(formData).subscribe((data: any) => {
      this.openSnack(data);

      if (data.success) {
        this.dialogRef.close(true);
      }
    });
  }

  public editForm(form: FormGroup) {

  }
  doLoadEpics(event) {

  }

  doLoadTasks(event) {
    let epic_id = this.frm.get('epic_id').value

    this.frm.get('epic_read_id').setValue(epic_id);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }




}
