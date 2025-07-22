import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  public constructor() {
    this.socket = io('http://localhost:3000');
  }

  public join(userId: string): void {
    this.socket.emit('join', userId);
  }

  public sendMessage(toUserId: string, message: string): void {
    this.socket.emit('private-message', { to: toUserId, message });
  }

  public onMessage(callback: (data: any) => void): void {
    this.socket.on('private-message', callback);
  }
}
