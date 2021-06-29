import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EpicService} from "~services/epic.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map, startWith} from "rxjs/operators";
import {SnackbarComponent} from "~components/snackbar/snackbar.component";

@Component({
  selector: 'app-epicwork',
  templateUrl: './epicwork.component.html',
  styleUrls: ['./epicwork.component.css']
})
export class EpicworkComponent implements OnInit {
  public frm: FormGroup;

  public departments: any[];
  public standardEpics: any[];

  public deptEpics: any[];
  options:  string[] = new Array();
  standardEpicLabels:  string[] = new Array();
  epicLabels:  string[] = new Array();
  filteredOptions: Observable<string[]>;
  constructor(
    public dialogRef: MatDialogRef<EpicworkComponent>,
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

      workOrder_desc: new FormControl(IS_EDITING ? data.workOrder_desc : null,[Validators.required, Validators.minLength(2)]),

    });
  }

  public save(form: FormGroup) {
    console.log(form.value);
    this.epicService.saveAll(form.value).subscribe((data: any) => {
      this.openSnack(data);

      if (data.success) {
        this.dialogRef.close(true);
      }
    });
  }

  public editForm(form: FormGroup) {

  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}


