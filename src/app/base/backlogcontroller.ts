import { PageEvent } from '@angular/material/paginator';
import {backlog} from "../models/backlog";

export abstract class BackLogController {

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

  abstract edit(backlog: backlog): void;

  abstract save(): void;

  abstract delete(backlog: backlog): void;

}
