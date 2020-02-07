import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { TriviaRoutingModule } from './trivia-routing.module';
import { TriviaService } from './trivia.service';

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    TriviaRoutingModule
  ],
  providers: [TriviaService]
})
export class TriviaModule { }
