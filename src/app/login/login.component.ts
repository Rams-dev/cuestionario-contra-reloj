import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tokenUser: string = ''
  userForm: FormGroup;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { 
    this.userForm = new FormGroup({
      idUsuario: new FormControl(Math.floor(Math.random() * 999999)),
      usuario: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }


  ingresar(){
    this.storageService.storeUser("token"+this.userForm.value.idUsuario, JSON.stringify(this.userForm.value))
    let idUsuario = this.userForm.value.idUsuario.toString()
    this.router.navigate([`/startQuestions/_token${idUsuario}/0`])
    
  }

}
