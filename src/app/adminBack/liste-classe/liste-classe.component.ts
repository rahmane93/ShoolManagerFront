import { Component, OnInit } from '@angular/core';
import {AdministrationNiveauService} from '../services/adminNiveauService/administration-niveau.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ClasseComponent} from '../classe/classe.component';
import {MatiereComponent} from '../matiere/matiere.component';
import {Matiere} from '../../models/Matiere';
import {Niveau} from '../../models/Niveau';

@Component({
  selector: 'app-liste-classe',
  templateUrl: './liste-classe.component.html',
  styleUrls: ['./liste-classe.component.css']
})
export class ListeClasseComponent implements OnInit {
  listNiveaux: Niveau[];
  listMatieresFromCurrentClasse: Matiere [];
  currentClasse: any;
  constructor(public dialog: MatDialog, private administrationNiveauService: AdministrationNiveauService, private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.administrationNiveauService.getAllNiveau()
      .subscribe(data => {
        this.listNiveaux = data._embedded.niveaus;
      }, error => {
        console.log(error);
      });
  }

  addClasse() {
    const dialogRef = this.dialog.open(ClasseComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reloadData();
      this.administrationNiveauService.classeForm.reset();
      console.log('The dialog was closed');
    });
  }

  updateClasse(idClasse: number) {
    this.administrationNiveauService.getClasseById(idClasse)
      .subscribe(data => {
        this.administrationNiveauService.classeForm.setValue(data);
      }, error => console.log(error));

    const dialogRef = this.dialog.open(ClasseComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentClasse = this.administrationNiveauService.classeForm.value;
      this.administrationNiveauService.classeForm.reset();
      this.reloadData();
      console.log('The dialog was closed');
    });
  }

  deleteClasse() {
    if (this.listMatieresFromCurrentClasse.length > 0) {
        console.error('impossible de supprimer cette classe, elle contient deja des matieres');
        return ;
    }
    this.administrationNiveauService.deleteClasse(this.currentClasse.id)
      .subscribe(
        data => {
          this.reloadData();
          this.currentClasse = null;
        },
        error => console.log(error));
  }

  addMatiere(idClasse: number) {
    this.administrationNiveauService.idCurrentClasse = idClasse;
    const dialogRef = this.dialog.open(MatiereComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadMatieresOfCurrentClasse();
      this.administrationNiveauService.matiereForm.reset();
      console.log('The dialog was closed');
    });
  }

  updateMatiere(idMatiere: number) {
    this.administrationNiveauService.matiereForm.controls['id'].setValue(idMatiere);
    this.administrationNiveauService.getMatiereById(idMatiere)
      .subscribe(data => {
        this.administrationNiveauService.matiereForm.controls['nom'].setValue(data['nom']);
        this.administrationNiveauService.matiereForm.controls['categorie'].setValue(data['categorie']);
        this.administrationNiveauService.matiereForm.controls['objectif'].setValue(data['objectif']);
        this.administrationNiveauService.matiereForm.controls['nbHeureHebdo'].setValue(data['nbHeureHebdo']);
        this.administrationNiveauService.matiereForm.controls['nbHeureTotal'].setValue(data['nbHeureTotal']);
        console.log(this.administrationNiveauService.matiereForm.value);
      }, error => console.log(error));
    const dialogRef = this.dialog.open(MatiereComponent, {
      width: '700px'}
    );

    dialogRef.afterClosed().subscribe(result => {
      this.loadMatieresOfCurrentClasse();
      this.administrationNiveauService.matiereForm.reset();
    });
  }

  deleteMatiere(id: number) {
    //ajout condition de suppression ici
    this.administrationNiveauService.deleteMatiere(id)
     .subscribe(
        data => {
          this.loadMatieresOfCurrentClasse();
        },
      error => console.log(error));
  }

    setMatieresOfCurrentClasse(niveau: any) {
    this.listMatieresFromCurrentClasse = null;
    this.currentClasse = niveau;
    this.administrationNiveauService.idCurrentClasse = this.currentClasse.id;
    this.loadMatieresOfCurrentClasse();
  }

  loadMatieresOfCurrentClasse() {
    this.administrationNiveauService.getMatiereByNiveau(this.currentClasse.id)
      .subscribe(data => {
        this.listMatieresFromCurrentClasse = data._embedded.matieres;
      }, error => {
        console.log(error);
      });
  }

}
