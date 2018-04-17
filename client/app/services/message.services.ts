import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as socketIOClient from 'socket.io-client';
@Injectable()
export class MessageService {

  public endpoint: string = "localhost:8000";
  public socket: any = socketIOClient(this.endpoint);
  constructor(private http: HttpClient) { }

  sendMessage(data): any {
    this.socket.on("fromMessage", data => {
      return data
    });
    // return this.http.post<any>('/api/message', data);
  }

  getMessages(): Observable<any> {
    return this.http.get<any>('/api/message');
  }
}
