import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';


@Injectable()
export class MessageService {

  constructor(private http: HttpClient, public auth: AuthService) { }

  sendMessage(data): any {
    const message = {
      from_user: this.auth.currentUser._id,
      content: data.message,
      created_at: new Date()
    }
    return this.http.post<any>('/api/message', message);
  }

  getMessages(): Observable<any> {
    return this.http.get<any>('/api/message');
  }
}
