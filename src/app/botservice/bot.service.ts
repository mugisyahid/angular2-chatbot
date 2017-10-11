import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class BotService {




  constructor(private http: HttpClient) {

  }

  getAnswer(text:String) : Observable<Object>{
    let jsonRequest = {
                      "version": "1.0",
                      "type": "askBot",
                      "callbackUrl": "callbackUrl",
                        "param":
                        {
                          "question": text,
                          "answer" : "I don't understand"
                        }
                    };

                    return  this.http.post('https://chatbot-backend-nodejs.herokuapp.com', jsonRequest).map(res => res);
  }
}
