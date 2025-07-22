import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';
import { ScreenShareComponent } from '../../components/screen-share/screen-share.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, RouterModule, ScreenShareComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  public message = '';
  public username = '';
  public messages: { user: string; text: string }[] = [];
  private socket: any;

  public ngOnInit(): void {
    this.username = prompt('Digite seu nome') || 'Anônimo';
    this.socket = io('http://localhost:3000');

    this.socket.on('chatMessage', (data: any) => {
      this.messages.push(data);
    });
  }

  public sendMessage(): void {
    if (this.message.trim() === '') return;

    const msg = { user: this.username, text: this.message };
    this.socket.emit('chatMessage', msg);
    this.message = '';
  }
}
