import { Component } from '@angular/core';
import { Geminiservice } from '../../services/geminiservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-geminitest',
  imports: [FormsModule,CommonModule],
  templateUrl: './geminitest.html',
  styleUrl: './geminitest.css',
})
export class Geminitest {
   prompt = '';
  response = '';

  constructor(private geminiService: Geminiservice) {}

  sendPrompt() {
    this.geminiService.generateText(this.prompt).subscribe({
      next: (res: any) => {
        this.response = res.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';
      },
      error: () => this.response = 'Error al llamar a Gemini'
    });
  }
}
