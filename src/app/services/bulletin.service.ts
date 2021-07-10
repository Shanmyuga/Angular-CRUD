import { Injectable } from '@angular/core';
import {BulletinProvider} from "~base/bulletinprovider";
import {Observable} from "rxjs";
import {deptmessage} from "~models/deptmessage";
import {Response} from "~models/response";
import {CONSTANST} from "~utils/constanst";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class BulletinService  implements BulletinProvider {

  loading = true;

  constructor(
    private http: HttpClient,
  ) { }

  headers = new HttpHeaders({
    'Authorization': 'JWT ' + localStorage.getItem('token')
  });

  delete(id: string): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANST.routes.deptMessage.delete.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  getList(sortActive: string, order: string, pageSize: number, page: number, searchByDept: string): Observable<Response> {
    let params = new HttpParams();
    params = params.append('active', sortActive);
    params = params.append('order', order);
    params = params.append('searchByDept', searchByDept);


    params = params.append('pageSize', pageSize.toString());
    params = params.append('page', page.toString());

    return this.http.get<Response>(
      CONSTANST.routes.deptMessage.list,
      { headers: this.headers, params: params }
    );
  }

  getOne(id: string): Observable<Response> {
    return undefined;
  }

  save(deptMessage: deptmessage): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.bulletin.save,
      {
        message: deptMessage.message,
        dept_assigned_to: deptMessage.dept_assigned_to,
        target_date: deptMessage.target_date,
        job_desc: deptMessage.workOrder_desc
        
      },
      { headers: this.headers }
    );
  }
}
