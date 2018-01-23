import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import{HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    results: string[];
    model = {
    nomPropietario: "", 
    placaSalida: "",
    placa: "",
    cilindraje: "0",
    comboTipo: ""


  }
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

	this.nameForm = new FormGroup ({
      nomPropietario: new FormControl('', {
        validators: Validators.required,
        updateOn: 'submit'
      }),
      comboTipo: new FormControl('', {
        validators: Validators.required,
        updateOn: 'submit'
      }),
      placaSalida: new FormControl('', {
        validators: Validators.required,
        updateOn: 'submit'
      }),
      cilindraje: new FormControl('', {
        validators: Validators.required,
        updateOn: 'submit'
      }),
      placa: new FormControl('', {
        validators: Validators.required,
        updateOn: 'submit'
      })
      language: new FormControl()
    });

   this.http.get('http://localhost:8888/api/consultarvehiculos').subscribe(data => {
   console.log(data);
   this.vehiculos=data.listVehiculos;
   this.myDataSource = new MatTableDataSource();
   this.myDataSource.data = data.listVehiculos;

   })
  }

  onSubmit(){
 this.http.post('http://localhost:8888/api/ingresarvehiculo', {
      "placa": this.model.placa,
      "propietario": this.model.nomPropietario,
      "cilindraje": this.model.cilindraje,
      "tipoVehiculo": this.model.comboTipo
    },{ responseType: 'text' })
      .subscribe(
        (data:any) => {
           alert(data)
           location.reload();
        }
      );
  

   }

   onClick(){

 this.http.post('http://localhost:8888/api/salidavehiculo',this.model.placaSalida)
      .subscribe(
        res => {
          if(res.valor != 0 ){
            alert("Mensaje:" + res.mensaje + " " + "El valor a pagar es de:" +  res.valor)
          }else{
            alert("Mensaje:" + res.mensaje + " ")
          }
          location.reload();
        }
      );
  

   }

  }

}
