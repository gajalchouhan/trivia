import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../trivia.service';
declare var $:any;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public allQuestions: any;
  public questions: any;
  public correctAnswer: any;
  public showQuestion: any = {question : '' , mcq :['']};
  public currentIndex: number;
  public resultCount:number = 0
  public allAns:any = [];
  public Rounds:number = 0;

  constructor(private triviaserv: TriviaService) { }


  public modifyData(data) {
    this.correctAnswer = data.map(item => item.correct_answer);
    
    this.questions = data.map(item => {
      return {
        question: item.question,
        mcq: [...item.incorrect_answers, item.correct_answer]
      }
    })

    this.showQuestion = this.questions[0];
    this.currentIndex = 1;
  }

  public checkUserAns(ans){    
     this.allAns.push(ans);
     this.currentIndex++;
     this.showQuestion = this.questions[this.currentIndex-1];

    if(this.currentIndex-1 === this.questions.length){
      $("#modalBox").click();
      this.getResult(this.allAns);
    }
  }

  public getResult(ans){
    for(let i=0; i<this.questions.length; i++){
      console.log(ans[i] , this.correctAnswer[i]);
      if(ans[i] === this.correctAnswer[i]){
        this.resultCount++;
      }
    }
  }

  public fetch_data() {
    this.triviaserv.getQuestionData().subscribe(
      res => {
        let response: any = res;
        this.allQuestions = response.results;
        this.modifyData(this.allQuestions);
        this.Rounds++;
      }
    )
  }

  ngOnInit() {
    this.fetch_data();
  }

}
