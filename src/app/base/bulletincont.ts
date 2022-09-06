import { PageEvent } from '@angular/material/paginator';
import {deptMessResponse} from "../models/deptmessresponse";
export abstract class BulletinCont {

  constructor() { }

  public displayedColumns: string[];

  public pageSizeOptions: number[];

  public pageSize: number;

  public dataSource: any;

  public pageEvent: PageEvent;

  public resultsLength: number;

  public page: number;

  public isLoading: boolean;

  public isTotalReached: boolean;

  public totalItems: number;



  abstract getData(): void;

  abstract edit(deptMessResponse: deptMessResponse): void;

  abstract save(): void;

  abstract close(deptMessResponse: deptMessResponse): void;

  abstract delete(deptMessResponse: deptMessResponse): void;

}
