import { epic } from '../../app/models/epicstory';
import { Response } from '../../app/models/response';
import { Observable } from 'rxjs';

export abstract class EpicProvider {

  constructor() { }

  abstract getList(sortActive: string, order: string, pageSize: number, page: number, search: string): Observable<Response>;

  abstract getOne(id: string): Observable<Response>;

  abstract save(epic: epic): Observable<Response>;

  abstract delete(id: string): Observable<Response>;

}
