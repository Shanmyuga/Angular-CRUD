import { epic } from '../../app/models/epicstory';
import { Response } from '../../app/models/response';
import { Observable } from 'rxjs';
import {backlog} from "../models/backlog";

export abstract class BackLogProvider {

  constructor() { }

  abstract getList(sortActive: string, order: string, pageSize: number, page: number, searchbyDept: string,searchByDesc: string ,searchByWork: string,searchByWorkDesc: string,searchByStatus: string ): Observable<Response>;

  abstract getOne(id: string): Observable<Response>;

  abstract save(backlog: backlog): Observable<Response>;

  abstract delete(id: string): Observable<Response>;

}
