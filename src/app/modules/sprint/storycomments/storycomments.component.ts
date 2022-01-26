import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BulletinService} from "~services/bulletin.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-storycomments',
  templateUrl: './storycomments.component.html',
  styleUrls: ['./storycomments.component.css']
})
export class StorycommentsComponent implements OnInit {
  public displayedColumns = [ '_user_comments', '_sprint_name', '_updated_date',  '_updated_by', '_assigned_to'];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource = new MatTableDataSource();
  public message = "";
  constructor(
    public dialogRef: MatDialogRef<StorycommentsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,


    public snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  this.dataSource.data = this.data.data;
  }

}
