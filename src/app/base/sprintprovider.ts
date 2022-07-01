import { Response } from '../../app/models/response';
import { Observable } from 'rxjs';
import {sprint} from "../models/sprint";

export abstract class SprintProvider {

  protected constructor() { }

  abstract getList(sortActive: string, order: string, pageSize: number, page: number, searchbyDept: string,searchByWO: string): Observable<Response>;

  abstract getOne(id: string): Observable<Response>;

  abstract save(sprint: sprint): Observable<Response>;

  abstract delete(id: string): Observable<Response>;

}
