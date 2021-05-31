import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conforce';

  numeroDobro = 0;
  resultadoDobro = 0;

  calcDobro(){
    this.resultadoDobro = this.numeroDobro * 2;
  }

  numeroMes = 0;
  diaMes = 30;
  resultadoMes = 0;

  calcMes(){
    this.resultadoMes = this.numeroMes * this.diaMes;
  }

}
