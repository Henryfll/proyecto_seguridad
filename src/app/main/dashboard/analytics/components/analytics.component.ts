import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AnalisisService } from '../services/analisis.service';
import { Analisis } from '../interfaces/analisis';
import { colors } from 'app/colors.const';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponent implements OnInit {

  // Public
  public data: any;
  public buscarUrl:string;
  analysisResults: any;
  public mensaje:string;
  verMas:boolean=false;
  objectKeys = Object.keys;
  porcentajes:number[]=[0,100,0,0];
  // doughnut Chart
  private tooltipShadow = 'rgba(0, 0, 0, 0.25)';
  private successColorShade = '#28dac6';
  private warningColorShade = '#ffe802';
  private warningLightColor = '#FDAC34';
  // doughnut Chart
  public doughnutChart = {
    chartType: 'doughnut',
    options: {
      responsive: false,
      responsiveAnimationDuration: 500,
      cutoutPercentage: 60,
      aspectRatio: 1.4,
      legend: { display: false },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[0].labels[tooltipItem.index] || '',
              value = data.datasets[0].data[tooltipItem.index];
            var output = ' ' + label + ' : ' + value + ' %';
            return output;
          }
        },
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: this.tooltipShadow,
        backgroundColor: colors.solid.white,
        titleFontColor: colors.solid.black,
        bodyFontColor: colors.solid.black
      }
    },

    datasets: [
      {
        labels: ['Clean', 'Unrated','Suspicious','Malicious'],
        data: this.porcentajes,
        backgroundColor: [this.successColorShade, this.warningLightColor,],
        borderWidth: 0,
        pointStyle: 'rectRounded'
      }
    ]
  };

  constructor(
    private _analisisService: AnalisisService,
  ) {
    };

  ngOnInit(): void {
    this.verMas=false;
    this.data=null;
    this.analysisResults=null;
  }

  analizarIp(){
    this.verMas=false;
    this.data=null;
    this.analysisResults=null;
    let encodedUrl = this.toBase64Url(this.buscarUrl);
    this._analisisService.analizarUrls(encodedUrl).subscribe(
      (respuesta:any)=>{
        this.mensaje="Datos Encontrados";
        this.data=respuesta;
        this.analysisResults=respuesta.data.attributes.last_analysis_results;
      let  datos = Object.keys(this.analysisResults).map(key => ({
        engine_name: this.analysisResults[key].engine_name,
        method: this.analysisResults[key].method,
        category: this.analysisResults[key].category,
        result: this.analysisResults[key].result
      }));


      let analisisClean:number=0;
      let analisisUnrated:number=0;
      let analisisSospechoso:number=0;
      let analisismalicious:number=0;
      datos.forEach(element => {
        if(element.result=="clean"){
          analisisClean++;
        }
        if(element.result=="unrated"){
          analisisUnrated++;
        }
        if(element.result=="suspicious"){
          analisisSospechoso++;
        }
        if(element.result=="malicious"){
          analisismalicious++;
        }
      });
      this.porcentajes=[analisisClean,analisisUnrated,analisisSospechoso,analisismalicious];
      },
      (error)=>{
        this.verMas=false;
        this.data=null;
        this.analysisResults=null;
        this.mensaje="Error: No se encontraron datos";
        console.log("error ", error );
      }
    );

  }
    vermasDetalles(){
      if (this.verMas==true) {
        this.verMas=false;
      }else{
        this.verMas=true;
      }
      
    }
   toBase64Url(input: string): string {
    // Convertir a Base64
    const base64 = btoa(input);
    // Eliminar caracteres de relleno "="
    const base64Url = base64.replace(/=+$/, '');
    // Reemplazar caracteres no URL-safe
    return base64Url.replace(/\+/g, '-').replace(/\//g, '_');
  }
}
