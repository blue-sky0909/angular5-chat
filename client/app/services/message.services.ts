import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as socketIOClient from 'socket.io-client';

import { AuthService } from './auth.service';


@Injectable()
export class MessageService {

  public endpoint: string = "localhost:8000";
  public socket: any = socketIOClient(this.endpoint);
  constructor(private http: HttpClient, public auth: AuthService) { }

  sendMessage(data): any {    
    const message = {
      from_user: this.auth.currentUser._id,
      content: data.message,
      created_at: new Date()
    }
    this.socket.send(message);
    
    this.socket.on("fromMessage", data => {
      console.log(data)
      return data
    });
    // return this.http.post<any>('/api/message', data);
  }

  getMessages(): Observable<any> {
    return this.http.get<any>('/api/message');
  }
}
