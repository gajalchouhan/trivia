import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class TriviaService {

  constructor(private http : HttpClient) { }


  public getQuestionData(){
   return new Observable((observer) => {
    this.http.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .subscribe(response => {
        observer.next(response);
      },(error) => {
        observer.error(error);
      })
    });
  }

}
