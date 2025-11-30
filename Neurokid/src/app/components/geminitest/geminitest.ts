import { Component, OnInit } from '@angular/core';
import { Geminiservice } from '../../services/geminiservice';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Rolesservice } from '../../services/rolesservice';
import { Symptomslogservice } from '../../services/symptomslogservice';
import { Roles } from '../../models/Roles';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatOption } from "@angular/material/core";
import { Symptomslog } from '../../models/SymptomsLog';
import { MatSelectModule } from '@angular/material/select';
import { Predictionservice } from '../../services/predictionservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Prediction } from '../../models/Prediction';

@Component({
  selector: 'app-geminitest',
  imports: [FormsModule, CommonModule, MatTableModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule, MatOption,
    MatSelectModule],
  templateUrl: './geminitest.html',
  styleUrl: './geminitest.css',
})
export class Geminitest implements OnInit{
   prompt = '';
  response = '';
  listaU:Roles[] = [];
  listaS:Symptomslog[] = [];
  listaSFiltrada:Symptomslog[] = [];
  form:FormGroup = new FormGroup({});
  user:string = "";
  sint:string = "";
  estatus:string = "";
  id:number = 0;
  edicion:boolean = false;
  pre: Prediction = new Prediction();
  ultimo:string = "";
  last:number = 0; 

  constructor(private geminiService: 
    Geminiservice,
    private rS:Rolesservice,
    private sS:Symptomslogservice,
    private fb: FormBuilder,
    private pS:Predictionservice,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
    })
    this.form = this.fb.group({
      Usuario:[''] ,
      sintoma:[''],
    });
    
    
    this.rS.list().subscribe((data)=>{
      this.listaU = data.filter(u=>u.role_name === "CHILD")
    })

    this.sS.list().subscribe((data) => {
    this.listaS = data; // guardamos todo sin filtrar
  });

   this.form.get('Usuario')?.valueChanges.subscribe((userId) => {

    // Si el usuario cambió, vaciar el síntoma seleccionado
    this.form.get('sintoma')?.setValue('');

    // Filtrar síntomas SOLO del usuario seleccionado
    const usuarioSeleccionado = this.listaU.find(u => u.user.userId === userId);

    if (usuarioSeleccionado) {
      this.listaSFiltrada = this.listaS.filter(
        s => s.user.username === usuarioSeleccionado.user.username
      );
      this.user = usuarioSeleccionado.user.username
    } else {
      this.listaSFiltrada = [];
    }
  });

  this.form.get('sintoma')?.valueChanges.subscribe((logId) => {

  // Buscar el objeto de síntoma por su ID
  const sintomaObj = this.listaSFiltrada.find(s => s.logId === logId);

  // Guardar el texto del síntoma
  this.sint = sintomaObj ? sintomaObj.symptomNotes : "";
  this.estatus = sintomaObj ? sintomaObj.moodEntry : "";
});

  }

  Consulta(){
    this.prompt = "Realiza una prediccion sobre el usuario " + this.user + " basandote en el sintoma "+ this.sint + " y que su estado emocial fue " + this.estatus;
  }

  actualizar(){
    this.ultimo = this.response.charAt(this.response.length -1);
    this.last = parseInt(this.ultimo);
    
  }

  sendPrompt() {
    this.geminiService.generateText(this.prompt).subscribe({
      next: (res: any) => {
        this.response = res.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';
      },
      error: () => this.response = 'Error al llamar a Gemini'
    });
  }

  Aplicar() {
    this.pre.predictionId = this.id;
    this.pre.explanationText = this.response;
    this.pre.predictedAt = new Date();
    this.pre.predictionScore = this.last;
    this.pre.log.logId = this.form.value.sintoma;
    this.pS.insert(this.pre).subscribe((data)=>{
      this.pS.list().subscribe((data) => {
            this.pS.setList(data);
    })
  })
  this.router.navigate(['Prediction']);
}
}
