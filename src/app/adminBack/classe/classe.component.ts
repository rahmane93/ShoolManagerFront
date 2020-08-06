import {Component, Inject, OnInit} from '@angular/core';
import {Niveau} from '../../models/Niveau';
import {Router} from '@angular/router';
import {AdministrationNiveauService} from '../services/adminNiveauService/administration-niveau.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClasseComponent>,
              private router: Router, private administrationNiveauService: AdministrationNiveauService) {}

  onSubmit() {
    if (this.formData().invalid) {
      return;
    }
    if (this.formData().controls['id'].value === null) {
      this.administrationNiveauService.createClasse(this.administrationNiveauService.classeForm.value)
        .subscribe(data => {
          this.closeDialog();
          this.administrationNiveauService.classeForm.reset();
        }, error => console.log(error));
    } else {
      this.administrationNiveauService.updateClasse(this.administrationNiveauService.classeForm.value)
        .subscribe(data => {
           this.closeDialog();
        }, error => console.log(error));
    }
  }
  formData() {
    return this.administrationNiveauService.classeForm;
  }
  cycles() {
    return this.administrationNiveauService.cycles;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
