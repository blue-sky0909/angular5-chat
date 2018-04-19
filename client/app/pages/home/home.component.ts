import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, OnChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.services';
import * as socketIOClient from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messageForm: FormGroup;
  message = new FormControl('', [
  ]);
  public messages: any = [];
  public endpoint: string = "localhost:3000";
  public socket: any = socketIOClient(this.endpoint);
  public msg: string = "";
  public tempDate: any = null;

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      message: this.message
    });
    this.messageService.getMessages().subscribe(
      res => this.messages = res.messages,
      error => console.log(error)
    )
    const that = this;
    this.socket.on('new-message', data => that.messages.push(data));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  sendMessage() {
    if(this.messageForm.value.message ) {
      const message = {
        from_user: this.auth.currentUser._id,
        content: this.messageForm.value.message,
        created_at: new Date()
      }
      this.messageService.sendMessage(this.messageForm.value).subscribe(
        res => {
          this.socket.emit('save-message', message)
          this.messageForm.value.message = "";
          this.msg = "";
        },
        error => console.log(error)
      );
    }    
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  showDateTime(message) {
    const date1 = moment(message.created_at).format('YYYY/MM/DD');
    let dateString = null;
    if (date1 != this.tempDate) {
      dateString = date1;
    }
    this.tempDate = date1;
    return dateString;
  }

}
