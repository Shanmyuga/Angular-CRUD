import { Injectable } from '@angular/core';
import {BackLogProvider} from "~base/backlogprovider";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "~models/response";
import {CONSTANST} from "~utils/constanst";
import {backlog} from "~models/backlog";
import {backlogResponse} from "~models/backlogResponse";

@Injectable()
export class BacklogService implements  BackLogProvider{

  loading = true;

  constructor(
    private http: HttpClient,
  ) { }

  headers = new HttpHeaders({
    'Authorization': 'JWT ' + localStorage.getItem('token')
  });


  delete(id: string): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANST.routes.backlog.delete.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  getList(sortActive: string, order: string, pageSize: number, page: number, searchByDept: string,searchByDesc: string,searchByWork: string,searchByWorkDesc: string,searchByStatus: string,searchByStageDesc: string,searchByTaskDesc: string): Observable<Response> {
    let params = new HttpParams();
    params = params.append('active', sortActive.substring(1,sortActive.length));
    params = params.append('order', order);
    params = params.append('searchByDept', searchByDept);
    params = params.append('searchByDesc', searchByDesc);
    params = params.append('searchByWorkDesc', searchByWorkDesc);
    params = params.append('searchByWork', searchByWork);
    params = params.append('searchByStatus', searchByStatus);
    params = params.append('searchByStageDesc', searchByStageDesc);
    params = params.append('searchByTaskDesc', searchByTaskDesc);
    params = params.append('pageSize', pageSize.toString());
    params = params.append('page', page.toString());

    return this.http.get<Response>(
      CONSTANST.routes.backlog.list,
      { headers: this.headers, params: params }
    );
  }

  getOne(id: string): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.backlog.get.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  save(backlog: backlog): Observable<Response> {
    return undefined;
  }
  getSprintByDept(dept: string) {
    let params = new HttpParams();
    params = params.append('dept', dept);
    return this.http.get<Response>(CONSTANST.routes.backlog.deptSprint,{ headers: this.headers ,params:params});
  }


  saveToSprint(backLog: backlog): Observable<Response> {


    return this.http.post<Response>(
      CONSTANST.routes.backlog.saveSprint,
      {
       seq_sprint_id:backLog.sprint_id,
       seq_backlog_id:backLog.backlog_id
      },
      { headers: this.headers }
    );
  }

}
