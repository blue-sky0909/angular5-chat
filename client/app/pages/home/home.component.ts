import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messageForm: FormGroup;
  mesage = new FormControl('', [
    Validators.required
  ]);
  public messages: any = [];

  constructor(public auth: AuthService, private formBuilder: FormBuilder, public message: MessageService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      mesage: this.mesage
    });
    this.message.getMessages().subscribe(
      res => console.log(res),
      error => console.log(error)
    )

    // this.socket.on('new-message', function (data) {
    //   if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {
    //     this.chats.push(data.message);
    //     this.msgData = { room: user.room, nickname: user.nickname, message: '' }
    //     this.scrollToBottom();
    //   }
    // }.bind(this));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    this.message.sendMessage(this.messageForm.value).subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
