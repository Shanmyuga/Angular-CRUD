import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EpicService} from "~services/epic.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map, startWith} from "rxjs/operators";
import {SnackbarComponent} from "~components/snackbar/snackbar.component";

@Component({
  selector: 'app-customepic',
  templateUrl: './customepic.component.html',
  styleUrls: ['./customepic.component.css']
})
export class CustomepicComponent implements OnInit {
  public frm: FormGroup;

  public departments: any[];
  public standardEpics: any[];

  public deptEpics: any[];
  options:  string[] = new Array();
  standardEpicLabels:  string[] = new Array();
  epicLabels:  string[] = new Array();
  filteredOptions: Observable<string[]>;
  constructor(
    public dialogRef: MatDialogRef<CustomepicComponent>,
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
    console.log("initialize called");
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;
    console.log(IS_EDITING);
    console.log(data);
    this.frm = this.fb.group({
      user_story_desc: new FormControl(IS_EDITING ? data[0]._user_story_task : null, [ Validators.required,Validators.minLength(20)]),
      internal_bklog_ref: new FormControl(IS_EDITING ? data[0].internal_bklog_ref : null, [ Validators.required,Validators.minLength(5)]),
      user_story_id: new FormControl(IS_EDITING ? data[0]._user_story_id : null, [ Validators.required,Validators.minLength(3)]),
      dept_id: new FormControl(IS_EDITING ? data[0]._dept_id : null,[Validators.required, Validators.minLength(2)]),
      workOrder_desc: new FormControl(IS_EDITING ? data.workOrder_desc : null,[Validators.required, Validators.minLength(2)]),
      epic_desc: new FormControl(IS_EDITING ? data[0]._epic_desc : null, [ Validators.minLength(2)]),


      epic_id: new FormControl(IS_EDITING ? data[0]._epic_id : null),
      epic_read_id: new FormControl(IS_EDITING ? data[0].epic_read_id : null)
    });
  }

  public save(form: FormGroup) {
    console.log(form.value);
    this.epicService.saveCustom(form.value).subscribe((data: any) => {
      this.openSnack(data);

      if (data.success) {
        this.dialogRef.close(true);
      }
    });
  }

  public editForm(form: FormGroup) {

  }
  doLoadEpics(event) {
    let dept = this.frm.get('dept_id').value
    this.epicService.getEpicsByDept(dept).subscribe((data: any) => {
      if(data.success) {
        this.deptEpics = data.data;
        data.data.forEach(d1 => {
          this.epicLabels.push(d1._value);
        });
      }
    });
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
