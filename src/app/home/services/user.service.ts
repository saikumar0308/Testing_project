import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {ApiService} from './api.service';

@Injectable()
export class UserService {

    constructor(private api: ApiService) {

    }


    getUsers(filter?: string): Observable<User[]> {

        let endPoint = '/users?client_id=3c423f2faef7742fd1b0&client_secret=514aa1dd19370dae006ea144fc770bb41bd8e995';

        return this.api.get(endPoint).map(res => res.json() as User[]).catch(err => Observable.throw(err));
    }

    search(q: string): Observable<any> {
        let endPoint = '/search/users?q=' + q;
        return this.api.get(endPoint).map(res => res.json()).catch(err => Observable.throw(err));

    }

    getUserFollowers(user: string): Observable<any> {

        let endPoint = '/users/' + user + '/followers';
        return this.api.get(endPoint).map(res => res.json()).catch(err => Observable.throw(err));
    }


}
