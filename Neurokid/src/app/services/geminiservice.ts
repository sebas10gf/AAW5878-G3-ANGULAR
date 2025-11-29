import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class Geminiservice {
  private apiKey = 'AIzaSyDtq_UlsJ3YmZog0UaRb9PBVudZ_HP6-cE';
  private url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  generateText(prompt: string) {
    const body = {
      contents: [
        {
        parts: [
          {
            text:
              "Eres un psicólogo virtual experto en terapia cognitivo-conductual (TCC) infantil. " +
              "Tu tono es empático, profesional y calmado. " +
              "Nunca das diagnósticos médicos. " +
              "Ayudas guiando, reflexionando y haciendo preguntas abiertas. " +
              "Siempre respondes en un lenguaje claro y humano."+
              "Cualquier consulta o texto enviado sobre temas no relacionados a lo psicoligico debes responder No entiendo tu mensaje podrias enviarlo denuevo porfavor?." 
          }
        ]
      },
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };

    return this.http.post(this.url, body);
  }
}
