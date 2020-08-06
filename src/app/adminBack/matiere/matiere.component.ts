import { Component, OnInit } from '@angular/core';
import {Matiere} from '../../models/Matiere';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministrationNiveauService} from '../services/adminNiveauService/administration-niveau.service';
import {Niveau} from '../../models/Niveau';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  BASE_URL = 'http://localhost:8080/niveaus/';

  constructor(public dialogRef: MatDialogRef<MatiereComponent>, private route: ActivatedRoute, private router: Router, private administrationNiveauService: AdministrationNiveauService) { }

  ngOnInit(): void {
    this.formData().controls['niveau'].setValue(this.BASE_URL + this.administrationNiveauService.idCurrentClasse);
   }
  closeDialog() {
    this.dialogRef.close();
  }
  formData() {
    return this.administrationNiveauService.matiereForm;
  }
  categories() {
    return this.administrationNiveauService.categories;
  }
  onSubmit() {
    if (this.formData().invalid) {
      return;
    }

    if (!this.formData().controls['id'].value) {
      this.administrationNiveauService.createMatiere(this.formData().value)
        .subscribe(data => {
        }, error => console.log(error));
    }
    else {
      this.administrationNiveauService.updateMatiere(this.formData().value)
        .subscribe(data => {
        }, error => console.log(error));
    }
    this.closeDialog();
  }
}
