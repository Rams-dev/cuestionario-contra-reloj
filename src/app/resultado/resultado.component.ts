import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  resultadoGuardado = false
  resultado:number= 0
  userForm: FormGroup;
  constructor(
    private storageService:StorageService,
    private router:Router
  ) { 
    this.userForm = new FormGroup({
      resultado:new FormControl('',),
      usuario: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    // this.createConfetti();
    this.resultado = parseInt(this.storageService.obtenerResultado())
    this.userForm.patchValue({resultado:this.resultado})

  }

  save(){
    console.log(this.userForm.value)
    this.storageService.saveResultado(this.userForm.value)
    this.resultadoGuardado = true;
    setTimeout(() => {
      this.router.navigate(["/"])
    }, 1000);

   
  }

  //////////////////////////////////////////////////////////////////

  // Confetti code adapted from https://www.kirilv.com/canvas-confetti/

  // createConfetti() {
  //   const canvas = document.getElementById('confetti') as HTMLCanvasElement;
  //   const ctx = canvas.getContext('2d');

  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;

  //   const pieces:any = [];
  //   const numberOfPieces = 200;
  //   const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff'];

  //   class Piece {
  //     x: number;
  //     y: number;
  //     rotation: number;
  //     color: string;
  //     diameter: number;
  //     speed: number;
  //     opacity: number;

  //     constructor() {
  //       this.x = Math.random() * canvas.width;
  //       this.y = Math.random() * canvas.height - canvas.height;
  //       this.rotation = Math.random() * 360;
  //       this.color = colors[Math.floor(Math.random() * colors.length)];
  //       this.diameter = Math.random() * 10 + 5;
  //       this.speed = this.diameter / 2;
  //       this.opacity = Math.random();
  //     }
  //   }

  //   function createPieces() {
  //     for (let i = 0; i < numberOfPieces; i++) {
  //       pieces.push(new Piece());
  //     }
  //   }

  //   function update() {
      
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     pieces.forEach((piece:any, index:any) => {
  //       piece.y += piece.speed;
  //       piece.rotation += piece.speed / 10;

  //       ctx.beginPath();
  //       ctx.lineWidth = piece.diameter;
  //       ctx.strokeStyle = piece.color;
  //       ctx.moveTo(piece.x + piece.rotation, piece.y);
  //       ctx.lineTo(piece.x + piece.rotation + piece.diameter / 2, piece.y + piece.diameter);
  //       ctx.stroke();

  //       if (piece.y > canvas.height) {
  //         pieces.splice(index, 1);
  //       }
  //     });

  //     requestAnimationFrame(update);
  //   }

  //   createPieces();
  //   update();
  // }



}
