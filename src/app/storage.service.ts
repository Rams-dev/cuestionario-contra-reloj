import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  storeUser(idToken: string, objectString: string){
      localStorage.setItem(idToken, objectString)
  }

  getUser(idToken: string){
    return localStorage.getItem(idToken)
  }

  guardarcalificacion(object:any){
    console.log(object);
    
    let calificaciones = localStorage.getItem("calificacionActualUsuario")
    if(calificaciones){
      let nuevaCalificacion = parseInt(calificaciones) + object.calificacion
      localStorage.setItem("calificacionActualUsuario", nuevaCalificacion)
    }else{
      localStorage.setItem("calificacionActualUsuario", object.calificacion)
    }
  }

  limpiarCalificacion(){
    localStorage.removeItem("calificacionActualUsuario")
  }


  obtenerResultado(){
    let calificaciones = localStorage.getItem("calificacionActualUsuario")
    return calificaciones ? calificaciones : "0"

  }


  saveResultado(data:any){
    let arrayData = []
    let ranking = localStorage.getItem("ranking")
    if(ranking){
      arrayData = JSON.parse(ranking)
      arrayData.push(data)
      localStorage.setItem("ranking", JSON.stringify(arrayData))
    }else{
      arrayData.push(data)
      localStorage.setItem("ranking", JSON.stringify(arrayData))
    }
  }


  obtenerRanking(){
    let ranking=[] 
    let rankingLS = localStorage.getItem("ranking")
    if(rankingLS){
      let data = JSON.parse(rankingLS)
      ranking = data.sort((a:any,b:any) => b.resultado - a.resultado)
    }

    return ranking
  }

}
