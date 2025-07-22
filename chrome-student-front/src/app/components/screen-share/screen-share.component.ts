import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-screen-share',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screen-share.component.html',
})
export class ScreenShareComponent implements OnInit {
  receivedScreenshot: string | null = null;

  public constructor(private socket: Socket) { }

  public ngOnInit(): void {
    this.socket.on('screenshot', (base64Image: string) => {
      console.log('Screenshot recebido:', base64Image);
      this.receivedScreenshot = base64Image;
    });
  }

  public captureAndSendScreenshot(): void {
    const container = document.getElementById('chat-container');
    if (!container) {
      console.error('Elemento chat-container não encontrado!');
      return;
    }

    htmlToImage.toPng(container, { skipFonts: true })
      .then((dataUrl) => {
        this.socket.emit('screenshot', dataUrl);
      })
      .catch((error) => {
        console.error('Erro ao capturar tela:', error);
      });
  }
}
