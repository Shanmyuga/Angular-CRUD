import { PageEvent } from '@angular/material/paginator';
import {sprintResponse} from "../models/sprintResponse";
export abstract class Sprintcontroller {

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

  abstract edit(sprintResponse: sprintResponse): void;

  abstract save(): void;

  abstract delete(sprintResponse: sprintResponse): void;

}
