import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Portifolio} from './models/portifolio';
import { Acao, SecurityAlternateID } from './models/acao'
import { NgForm } from '@angular/forms';
import { newArray } from '@angular/compiler/src/util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http';
  portifolio = {} as Portifolio;
  portifolios : Portifolio[];

  acao = {} as Acao;
  acoes : Acao[];

  securityAlternateID = {} as SecurityAlternateID;
  securityAlternateIDs : SecurityAlternateID[];

  constructor(private apiService : ApiService){}
  ngOnInit() {
    this.getPortifolio();
  }
  reload(){
    location.reload();
  }

  getPortifolio(){
    this.apiService.getPortifolio().subscribe((portifolios: Portifolio[]) => {
      this.portifolios = portifolios;
    });
  }
  saveAcao(form: NgForm){
    this.refactorAcao(this.acao,this.securityAlternateID);
    var acoes=[];
    acoes.push(this.acao);
    this.apiService.postAcao(acoes).subscribe( () => {
      this.cleanForm(form);
    });
  }
  refactorAcao(acao:Acao, securityAlternateID : SecurityAlternateID){
    securityAlternateID.Source='Symbol';
    acao.SecurityAlternateIDs=[];
    acao.FundID='19404';
    acao.Side='1';
    acao.BrokerID=628;
    acao.TradeDate='2017-01-02';
    acao.ProductSubTypeID=1;
    acao.SecurityAlternateIDs.push(securityAlternateID);
    acao.Source='M';
    acao.Price = parseFloat(acao.Price.toString().replace(",", "."));
    acao.Quantity = parseFloat(acao.Quantity.toString().replace(",", "."));
  }
  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPortifolio();
    form.resetForm();
    this.acao = {} as Acao;
  }
  
}
