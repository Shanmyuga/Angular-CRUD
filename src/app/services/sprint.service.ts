import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "~models/response";
import {CONSTANST} from "~utils/constanst";
import {sprint} from "~models/sprint";

import {SprintProvider} from "~base/sprintprovider";
import {sprintResponse} from "~models/sprintResponse";

@Injectable()
export class SprintService implements SprintProvider{

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

  deleteData(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANST.routes.epic.delete.replace(':id', String(id)),
      { headers: this.headers }
    );
  }
  updateSprintToBackLog(sprintResponse: sprintResponse): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.sprint.updateSprintToBackLog,
      { seq_sprint_job_id: sprintResponse._seq_sprint_job_id,
              seq_backlog_id: sprintResponse._seq_backlog_id
      },{headers:this.headers}
    );
  }

  closeStory(sprintResponse: sprintResponse): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.sprint.closeStory,
      { seq_sprint_job_id: sprintResponse._seq_sprint_job_id,
        seq_backlog_id: sprintResponse._seq_backlog_id
      },{headers:this.headers}
    );
  }

  updateBackLog(id: string): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.epic.delete.replace(':id', String(id)),
      { headers: this.headers }
    );
  }
  getList(sortActive: string, order: string, pageSize: number, page: number, searchByName: string): Observable<Response> {
    let params = new HttpParams();
    params = params.append('active', sortActive);
    params = params.append('order', order);
    params = params.append('searchByName', searchByName);


    params = params.append('pageSize', pageSize.toString());
    params = params.append('page', page.toString());

    return this.http.get<Response>(
      CONSTANST.routes.sprint.list,
      { headers: this.headers, params: params }
    );
  }

  getOne(id: string): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.sprint.get.replace(':id', String(id)),
      { headers: this.headers }
    );
  }
  getOneData(id: number): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.sprint.get.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  getComments(id: number): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.sprint.getComments.replace(':id', String(id)),
      { headers: this.headers }
    );
  }
  getCommentsForBackLog(id: string): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.sprint.getComments.replace(':id', id),
      { headers: this.headers }
    );
  }

  save(sprint: sprint): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.sprint.save,
      {
        seq_sprint_job_id:sprint.seq_sprint_job_id,
        seq_backlog_id:sprint.seq_backlog_id,
        comments: sprint.comments,
        assigned_to: sprint.assigned_to
      },
      { headers: this.headers }
    );
  }

  updateWithComments(sprint: sprint,action : string): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.sprint.save,
      {
        seq_sprint_job_id:sprint.seq_sprint_job_id,
        seq_backlog_id:sprint.seq_backlog_id,
        comments: sprint.comments,
        assigned_to: sprint.assigned_to,
        action: action
      },
      { headers: this.headers }
    );
  }
  getDepts() {
    return this.http.get<Response>(CONSTANST.routes.epic.dept,{ headers: this.headers });
  }
  getSprintByDept(dept: string) {
    let params = new HttpParams();
    params = params.append('dept', dept);
    return this.http.get<Response>(CONSTANST.routes.sprint.deptSprint,{ headers: this.headers ,params:params});
  }

  getSprintData(sprintName: string) {
    let params = new HttpParams();
    params = params.append('sprintName', sprintName);
    return this.http.get<Response>(CONSTANST.routes.sprint.sprintData,{ headers: this.headers ,params:params});
  }

  getUsers() {
    return this.http.get<Response>(CONSTANST.routes.sprint.users,{ headers: this.headers });
  }
}
