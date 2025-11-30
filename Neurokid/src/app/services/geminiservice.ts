import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class Geminiservice {
  private apiKey = 'AIzaSyARzETJ6ER7TmEe8DLBqXxcMT2TjaK77OI';
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
              "Ayudas guiando, reflexionando y haciendo preguntas abiertas. " +
              "Siempre respondes en un lenguaje claro y humano."+
              "Cualquier consulta o texto enviado sobre temas no relacionados a lo psicoligico debes responder No entiendo tu mensaje podrias enviarlo denuevo porfavor?." +
              "Si te llega alguna peticion que inicie de la forma Realiza una prediccion sobre el usuario... Debes realizar la prediccion de cual crees que sea la causa de su problema de manera con concisa y corta y asignale una puntuacion del 1 al 10 donde 1 es leve y 10 es grave y no agregues el inicio del promt en tu respuesta." + 
              "El puntaje siempre debe ser el ultimo digito de tu respuesta sin excepciones."
              
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
