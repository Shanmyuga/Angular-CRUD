import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CONSTANST } from '~utils/constanst';
import { epic } from '~app/models/epicstory';
import { Response } from '~app/models/response';

import { EpicProvider } from '../base/Epicprovider';
import { Observable } from 'rxjs';


@Injectable()
export class EpicService implements  EpicProvider {

  loading = true;

  constructor(
    private http: HttpClient,
  ) { }

  headers = new HttpHeaders({
    'Authorization': 'JWT ' + localStorage.getItem('token')
  });

  delete(id: string): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANST.routes.epic.delete.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  getList(sortActive: string, order: string, pageSize: number, page: number, search: string): Observable<Response> {
    let params = new HttpParams();
    params = params.append('active', sortActive);
    params = params.append('order', order);
    params = params.append('search', search);
    params = params.append('pageSize', pageSize.toString());
    params = params.append('page', page.toString());

    return this.http.get<Response>(
      CONSTANST.routes.epic.list,
      { headers: this.headers, params: params }
    );
  }

  getDepts() {
    return this.http.get<Response>(CONSTANST.routes.epic.dept,{ headers: this.headers });
  }
  getEpicsByDept(dept: string) {
    let params = new HttpParams();
    params = params.append('dept', dept);
    return this.http.get<Response>(CONSTANST.routes.epic.epicDept,{ headers: this.headers ,params:params});
  }
  getTasksByEpic(epicId: string) {
    let params = new HttpParams();
    params = params.append('epicId', epicId);
    return this.http.get<Response>(CONSTANST.routes.epic.epicTasks,{ headers: this.headers ,params:params});
  }
  getWorkOrders() {
    return this.http.get<Response>(CONSTANST.routes.epic.workorder,{ headers: this.headers });
  }
  getOne(id: string): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.epic.get.replace(':id', String(id)),
      { headers: this.headers }
    );
      }
  getEpicForEdit(id: string): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.epic.get.replace(':id', id),
      { headers: this.headers }
    );
  }
  save(epic: epic): Observable<Response> {


    return this.http.post<Response>(
      CONSTANST.routes.epic.save,
      {
        dept_id: epic.epic_dept,

        custom_user_story_desc: epic.custom_user_story_desc,
        custom_user_story_id: epic.custom_user_story_id,
        standard_epic_id: epic.standard_epic_id,
        workOrder_desc: epic.workOrder_desc
      },
      { headers: this.headers }
    );
  }
  saveCustom(epic: epic): Observable<Response> {


    return this.http.post<Response>(
      CONSTANST.routes.epic.saveCustom,
      {
        dept_id: epic.dept_id,

        custom_user_story_desc: epic.user_story_desc,
        custom_user_story_id: epic.user_story_id,
        standard_epic_id: epic.epic_id,
        workOrder_desc: epic.workOrder_desc
      },
      { headers: this.headers }
    );
  }

  saveAll(epic: epic): Observable<Response> {


    return this.http.post<Response>(
      CONSTANST.routes.epic.saveAll,
      {

        workOrder_desc: epic.workOrder_desc
      },
      { headers: this.headers }
    );
  }

}
