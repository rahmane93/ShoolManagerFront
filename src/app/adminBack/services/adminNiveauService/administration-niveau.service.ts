import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Niveau} from '../../../models/Niveau';
import {Matiere} from '../../../models/Matiere';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdministrationNiveauService {

  private baseUrl = 'http://localhost:8080/';
  public idCurrentClasse: number;
  constructor(private http: HttpClient) { }

  classeForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cycle: new FormControl('', [Validators.required]),
    fraisInscription: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    fraisScolarite: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
  });

  matiereForm = new FormGroup({
    id: new FormControl(null),
    nom: new FormControl('', [Validators.required, Validators.minLength(5)]),
    categorie: new FormControl('', [Validators.required]),
    objectif: new FormControl('', [Validators.required]),
    nbHeureHebdo: new FormControl(null, [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]*$')]),
    nbHeureTotal: new FormControl(null, [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]*$')]),
    niveau: new FormControl('')
  });

  cycles = [
    {nom: 'MATERNELLE'},
    {nom: 'PRIMAIRE'},
    {nom: 'COLLEGE'},
    {nom: 'LYCEE'},
  ];
  categories = [
    {nom: 'Science de la matière'},
    {nom: 'Histoire et Culture'},
    {nom: 'Sciences mathématiques'},
    {nom: 'Science de la nature'},
  ];

  getAllNiveau(): Observable<any> {
      return this.http.get<any>(this.baseUrl + 'niveaus');
  }

  getClasseById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'niveaus/' + id);
  }

  createClasse(classe: any): Observable<any> {
    return this.http.post(this.baseUrl + 'niveaus', classe);
  }

  updateClasse(classe: Niveau): Observable<any> {
    return this.http.post(this.baseUrl + 'niveaus', classe);
  }

  deleteClasse(idClasse: number): Observable<any> {
    return this.http.delete<Matiere>(this.baseUrl + 'niveaus/' + idClasse);
  }

  getMatiereByNiveau(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'niveaus/' + id + '/matieres');
  }

  getMatiereById(id: number): Observable<Matiere> {
    return this.http.get<Matiere>(this.baseUrl + 'matieres/' + id);
  }

  updateMatiere(matiere: any): Observable<any> {
    return this.http.patch(this.baseUrl + 'matieres/' + matiere.id, matiere);
  }

  createMatiere(matiere: Matiere): Observable<any> {
    return this.http.post(this.baseUrl + 'matieres', matiere);
  }

  deleteMatiere(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'matieres/' + id);
  }

}
