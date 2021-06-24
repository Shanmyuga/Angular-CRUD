import { PageEvent } from '@angular/material/paginator';
import {backlogResponse} from "../models/backlogResponse";
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

  abstract edit(backlogResponse: backlogResponse): void;

  abstract save(): void;

  abstract delete(backlogResponse: backlogResponse): void;

}
