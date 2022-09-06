import { Response } from '../../app/models/response';
import { Observable } from 'rxjs';
import {deptmessage} from "~models/deptmessage";

export abstract class BulletinProvider {

  protected constructor() { }

  abstract getList(sortActive: string, order: string, pageSize: number, page: number, searchbyDept: string,searchByAckStatus: string, searchByFromDept: string): Observable<Response>;

  abstract getOne(id: string): Observable<Response>;

  abstract save(deptMessage: deptmessage): Observable<Response>;

  abstract delete(id: string): Observable<Response>;

  abstract close(deptMessage: deptmessage): Observable<Response>;
}
