import {Register} from '../models/register';
import {Observable, of} from 'rxjs';


export class UserMockService {

  register(user: Register): Observable<Object> {
    return of();
  }
}
