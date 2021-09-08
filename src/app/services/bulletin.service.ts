import {Inject, Injectable} from '@angular/core';
import {BulletinProvider} from "~base/bulletinprovider";
import {Observable} from "rxjs";
import {deptmessage} from "~models/deptmessage";
import { download, Download } from './download'
import {Response} from "~models/response";
import {CONSTANST} from "~utils/constanst";
import {HttpResponse} from '@angular/common/http';
import { SAVER, Saver } from './saver.provider'
import {deptMessResponse} from "~models/deptmessresponse";

import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class BulletinService  implements BulletinProvider {

  loading = true;

  constructor(
    private http: HttpClient,
    @Inject(SAVER) private saveFile: Saver
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

  getOneData(seq_dept_message_id: string): Observable<Response> {
    let params = new HttpParams();
    return this.http.get<Response>(
      CONSTANST.routes.deptMessage.loadMessage.replace(':id',seq_dept_message_id),
      { headers: this.headers, params: params }
    );
  }
  openFile(deptMessResponse: deptMessResponse): Observable<Download> {
    let params = new HttpParams();


    return this.http.get(
      CONSTANST.routes.deptMessage.open.replace(':id', String(deptMessResponse._seq_dept_mess_id)),
      {
        headers: this.headers,
        reportProgress: true,
        params: params,
        observe: 'events',
        responseType: 'blob'
      }).pipe(download(blob => this.saveFile(blob, deptMessResponse._original_fileName)));
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

  edit(deptMessage: deptmessage): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.bulletin.edit,
      {
        ack_message: deptMessage.ack_message,

        seq_dept_mess_id: deptMessage.seq_dept_mess_id

      },
      { headers: this.headers }
    );
  }

  saveFormData(formData: FormData): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.bulletin.save,
      formData,
      { headers: this.headers }
    );
  }

  updateData(formData: FormData): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.bulletin.save,
      formData,
      { headers: this.headers }
    );
  }
}
