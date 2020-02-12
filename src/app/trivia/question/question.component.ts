import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../trivia.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  public resultCount:number = 0;
  public allAns:any = [];
  public Rounds:number = 0;
  public showResult:boolean = false;

  constructor(private triviaserv: TriviaService) { }


  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
  }

  public modifyData(data) {
    this.correctAnswer = data.map(item => item.correct_answer);
    
    this.questions = data.map(item => {
      return {
        question: item.question,
        mcq: [...item.incorrect_answers, item.correct_answer]
      }
    })

    this.questions.forEach(element => {
       element.mcq = this.shuffle(element.mcq);
    });

    this.showQuestion = this.questions[0];
    this.currentIndex = 0;
  }

  public checkUserAns(ans){ 
    this.currentIndex++;   
    if(this.currentIndex <= this.questions.length-1){
     this.allAns.push(ans);
     this.showQuestion = this.questions[this.currentIndex];
    }
    else{ 
        this.currentIndex = this.questions.length - 1;
        this.allAns.push(ans);
        this.getResult(this.allAns);
    }
    
  }

  // Calculate a result 
  public getResult(ans){
    this.resultCount = 0;
    for(let i=0; i<this.questions.length; i++){
      if(ans[i] === this.correctAnswer[i]){
        this.resultCount = this.resultCount + 1;
      }
    }
    
    this.currentIndex = 0;
    this.showQuestion = [];
    this.allAns = [];
    this.correctAnswer = [];
    $("#modalBox").click();
  }

  // fetch data from api.
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
