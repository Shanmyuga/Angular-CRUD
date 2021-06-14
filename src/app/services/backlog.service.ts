import { Injectable } from '@angular/core';
import {BackLogProvider} from "~base/backlogprovider";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "~models/response";
import {CONSTANST} from "~utils/constanst";
import {backlog} from "~models/backlog";

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

  getList(sortActive: string, order: string, pageSize: number, page: number, searchByDept: string,searchByDesc: string,searchByWork: string): Observable<Response> {
    let params = new HttpParams();
    params = params.append('active', sortActive);
    params = params.append('order', order);
    params = params.append('searchByDept', searchByDept);
    params = params.append('searchByDesc', searchByDesc);
    params = params.append('searchByWork', searchByWork);

    params = params.append('pageSize', pageSize.toString());
    params = params.append('page', page.toString());

    return this.http.get<Response>(
      CONSTANST.routes.backlog.list,
      { headers: this.headers, params: params }
    );
  }

  getOne(id: string): Observable<Response> {
    return undefined;
  }

  save(backlog: backlog): Observable<Response> {
    return undefined;
  }
}
