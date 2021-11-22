import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "~components/snackbar/snackbar.component";
import {SprintService} from "~services/sprint.service";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  public frm: FormGroup;

  public sprints: any[];
  public users: any[];
public action : any;
  public standardEpics: any[];
  options:  string[] = new Array();
  standardEpicLabels:  string[] = new Array();
  filteredOptions: Observable<string[]>;
  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private sprintService: SprintService,
    public snack: MatSnackBar
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();
    this.sprintService.getUsers().subscribe((data: any) => {
      if(data.success) {
        this.users = data.data;

        this.action = this.data.action;
      }
    });
  }

  openSnack(data: any) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: {data: data},
      duration: 3000
    });
  }

  private initializeForm() {
    console.log("initialize called");
    const IS_EDITING = true;

    const data = this.data.data;
    console.log(IS_EDITING);
    console.log(data);
    this.frm = this.fb.group({
      user_story_desc: new FormControl(IS_EDITING ? data[0]._user_story_task : null, [Validators.minLength(1)]),
      user_story_id: new FormControl(IS_EDITING ? data[0]._user_story_id : null, [Validators.minLength(1)]),
      dept_id: new FormControl(IS_EDITING ? data[0]._dept_id : null, [Validators.required, Validators.minLength(2)]),

      epic_desc: new FormControl(IS_EDITING ? data[0]._epic_desc : null, [Validators.required, Validators.minLength(2)]),
      seq_sprint_job_id: new FormControl(IS_EDITING ? data[0]._seq_sprint_job_id : null),
      seq_backlog_id: new FormControl(IS_EDITING ? data[0]._seq_backlog_id : null),
      job_desc: new FormControl(IS_EDITING ? data[0]._job_desc : null),
      epic_id: new FormControl(IS_EDITING ? data[0]._epic_id : null),
      comments: new FormControl(IS_EDITING ? data[0]._comments : null),
      assigned_to: new FormControl(IS_EDITING ? data[0]._assigned_to : null)
    });
  }

  public save(form: FormGroup) {
    this.sprintService.updateWithComments(form.value,this.action).subscribe((data: any) => {
      this.openSnack(data);

      if (data.success) {
        this.dialogRef.close(true);
      }
    });

  }

  public editForm(form: FormGroup) {

  }

}

