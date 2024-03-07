import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { preguntas } from '../preguntas';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, interval } from 'rxjs';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, AfterViewInit  {

  preguntasList:any  = []
  token = ''
  noPreguntas:any = []
  noPregunta:number = 0
  preguntaActual:any;
  preguntaForm: FormGroup;
  timeStart = 30
  time = 30
  dataToSave = {}
  esCorrectaLaRespuesta:string|boolean = ''
  interval:any

  // pSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // noPregunta = this.pSubject.asObservable();

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private storageService: StorageService
    ){
      this.preguntaForm = new FormGroup({
        pregunta1: new FormControl(''),
        pregunta2 :      new FormControl('',),
        pregunta3:   new FormControl('',),
      })
      this.storageService.limpiarCalificacion()

  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      console.log(data);
      
      this.renderPreguntas()
    })


    this.preguntaForm.valueChanges.subscribe(data => {
      console.log(data);
      console.log(this.time);
      
    })
  }


  

  renderPreguntas(){

    this.route.paramMap.subscribe(params => {
      this.noPregunta   =  parseInt(params.get('pregunta') ?? '0')
      console.log(this.noPregunta);
      this.token = params.get('token') ?? ''
    })

    if(this.noPregunta == 0){
      this.listPreguntas()
    }else{
      this.preguntaActual = this.preguntasList[this.noPregunta]
      if(!this.preguntaActual){
        this.router.navigate(["/"])
        return 
      }
      
    } 

  }

  

  

  ngAfterViewInit(): void {
    // Código que se ejecuta después de que las vistas secundarias del componente se han inicializado completamente
    this.setTime()
  }


  listPreguntas(){
    let maxPreguntas = 10
    while(maxPreguntas > 0){
      const noPregunta = this.getRandomInt(20)
      let pregunta = preguntas[noPregunta]
      
      if(this.noPreguntas.includes(pregunta.noPregunta)) {
        continue
      }else{
        this.noPreguntas.push(pregunta.noPregunta)
      }
      this.preguntasList.push(pregunta);
      
      maxPreguntas--
    }
    this.preguntaActual = this.preguntasList[0]

    console.log(this.preguntasList);
    console.log(this.preguntaActual);
         
  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  saveData(){
    this.storageService.guardarcalificacion(this.dataToSave)
    setTimeout(() => {
      this.siguientePregunta()
    }, 1500);
    
  }

  skip(){
    let pregunta = this.noPregunta
    
    this.dataToSave = {
      "Nopregunta": pregunta,
      "calificacion": 0
    }
    this.saveData()
    // this.siguientePregunta()

  }

  siguientePregunta(){
    let nextQuestion = this.noPregunta += 1
    this.esCorrectaLaRespuesta = ''
    this.preguntaForm.reset()
    if(nextQuestion >= 10){
      this.verResultado()
      return
    }
    this.router.navigate([`startQuestions/${this.token}/`+ nextQuestion])
    this.setTime()

  }

  setTime(){
    this.time = this.timeStart
    
    this.interval = setInterval(() => {
      this.time--;
      if(this.time <= 0){
        this.skip()
        clearInterval(this.interval);
      }     
    }, 1000);
  }  




  selectQuestion(question:string){
    clearInterval(this.interval)
    let trueQuestion  = this.preguntaActual.respuesta_correcta
    console.log(question);
    console.log(this.preguntaActual.respuesta_correcta);
    
    this.esCorrectaLaRespuesta = question == trueQuestion

    this.dataToSave = {
      "Nopregunta": this.noPregunta,
      "calificacion": this.esCorrectaLaRespuesta ? this.time : 0
    }
    this.saveData()
  }

  verResultado(){
    this.router.navigate(["/resultado"])
  }
  

}
