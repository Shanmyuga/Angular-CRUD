import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {BulletinService} from "~services/bulletin.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ackcomments',
  templateUrl: './ackcomments.component.html',
  styleUrls: ['./ackcomments.component.css']
})
export class AckCommentsComponent implements OnInit {
  public message = "";
  constructor(
    public dialogRef: MatDialogRef<AckCommentsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private bulletinService: BulletinService,
    public snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.data.action === "viewMessage") {
      this.message = this.data.data[0]._message;
    }

    if(this.data.action === "viewAck") {
      this.message = this.data.data[0]._ack_comments;
    }
  }

}
