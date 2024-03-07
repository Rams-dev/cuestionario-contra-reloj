import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  
  ranking=[]

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.ranking = this.storageService.obtenerRanking()
    console.log(this.ranking);
    
  }

}
