import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {


  category=[
    {
      cid:0,
      title:'Loading... ',
      description:'Loading... '
      
    }
  ];
  quizData={
    id:'',
    title:'',
    description:'',
    maxMax:'',
    numberOfQuestion:'',
    active:false,
    category:{
      cid:''
    }
  };
  constructor(private _category:CategoryService,private _quiz:QuizService
    ,private _router:Router) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.category=data;
     
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data ",'error');
    }
    )
  }


  /**
   * formSubmit
   */
  public formSubmit() {
    this._quiz.addNewQuiz(this.quizData).subscribe((data:any)=>{
      this._router.navigate(['/admin/quizzes']);

      Swal.fire("Success","Quizz added successfully","success");
    },
    (error)=>{
      console.log(error)
      Swal.fire("Faild !!","Quizz added faild","error");
    }
    )
  }
  }


