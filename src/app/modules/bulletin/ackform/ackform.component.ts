import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EpicService} from "~services/epic.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BulletinComponent} from "~modules/bulletin/bulletin.component";
import {BulletinService} from "~services/bulletin.service";
import {SnackbarComponent} from "~components/snackbar/snackbar.component";

@Component({
  selector: 'app-ackform',
  templateUrl: './ackform.component.html',
  styleUrls: ['./ackform.component.css']
})
export class AckformComponent implements OnInit {
  public frm: FormGroup;

  public departments: any[];
  public standardEpics: any[];

  public deptEpics: any[];
  options:  string[] = new Array();
  standardEpicLabels:  string[] = new Array();
  epicLabels:  string[] = new Array();
  filteredOptions: Observable<string[]>;
  constructor(
    public dialogRef: MatDialogRef<AckformComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private bulletinService: BulletinService,
    public snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
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

      ack_message: new FormControl(IS_EDITING ? data[0]._ack_message : null, [ Validators.minLength(2)]),


      seq_dept_mess_id: new FormControl(IS_EDITING ? data[0]._seq_dept_mess_id : null),
      message: new FormControl(IS_EDITING ? data[0]._message : null)
    });
  }

  public save(form: FormGroup) {
    console.log(form.value);
    this.bulletinService.edit(form.value).subscribe((data: any) => {
      this.openSnack(data);

      if (data.success) {
        this.dialogRef.close(true);
      }
    });
  }

}
