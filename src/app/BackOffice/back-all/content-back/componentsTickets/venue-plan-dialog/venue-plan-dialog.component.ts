import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VenuePlan } from 'src/app/core/models/venue-plan.model'; // Ajustez le chemin selon votre structure de projet
import { VenuePlanService } from 'src/app/core/services/venue-plan.service';

@Component({
  selector: 'app-venue-plan-dialog',
  templateUrl: './venue-plan-dialog.component.html',
  styleUrls: ['./venue-plan-dialog.component.css']
})
export class VenuePlanDialogComponent {
  newVenuePlan: VenuePlan = new VenuePlan();
  selectedRowLabel: string = '';
  numberOfSeatsInRow: number | null = null;
  rowLabels: string[] = ['A', 'B', 'C', 'D', 'E']; 

  constructor(private venuePlanService: VenuePlanService,
    public dialogRef: MatDialogRef<VenuePlanDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any)
     { this.newVenuePlan.seatStructure = {};
     if (data.venuePlan) {
      // If an existing venue plan is passed, create a copy of it for editing
      this.newVenuePlan = { ...data.venuePlan };
    }}

  addRow(): void {
    if (this.selectedRowLabel && this.numberOfSeatsInRow) {
      // Ajouter ou mettre à jour le nombre de sièges pour la rangée sélectionnée
      this.newVenuePlan.seatStructure![this.selectedRowLabel] = this.numberOfSeatsInRow;
      this.selectedRowLabel = ''; // Réinitialiser la sélection
      this.numberOfSeatsInRow = null; // Réinitialiser le nombre de sièges
    }
  }

  addVenuePlan(): void {
    if (this.isValidVenuePlan(this.newVenuePlan)) {
      this.venuePlanService.addVenuePlan(this.newVenuePlan).subscribe({
        next: (result) => {
          console.log('Plan de salle ajouté avec succès', result);
          this.resetForm();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du plan de salle', error);
        }
      });
    } else {
      // Gérer la validation ou afficher une erreur à l'utilisateur
      console.error('Le formulaire de plan de salle est invalide');
    }
  }

  isValidVenuePlan(venuePlan: VenuePlan): boolean {
  // Check if the seatStructure is defined or default to an empty object.
  const seatStructureKeys = Object.keys(venuePlan.seatStructure ?? {});
  // Check if totalSeats, length_S, width_S are defined and seatStructure has keys
  return !!venuePlan.totalSeats && 
         !!venuePlan.length_S && 
         !!venuePlan.width_S && 
         seatStructureKeys.length > 0;
}


  resetForm(): void {
    // Réinitialiser le formulaire et toutes les propriétés liées au formulaire
    this.newVenuePlan = new VenuePlan();
    this.newVenuePlan.seatStructure = {};
    this.selectedRowLabel = '';
    this.numberOfSeatsInRow = null;
  }

  onSubmit(): void {
    if (this.isValidVenuePlan(this.newVenuePlan)) {
      if (this.newVenuePlan.idPlan) {
        // Si un ID est présent, c'est une mise à jour
        this.venuePlanService.modifyVenuePlan(this.newVenuePlan).subscribe({
          next: (result) => {
            console.log('Plan de salle mis à jour avec succès', result);
            this.dialogRef.close(result);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du plan de salle', error);
          }
        });
      } else {
        // Pas d'ID, donc c'est un nouvel ajout
        this.venuePlanService.addVenuePlan(this.newVenuePlan).subscribe({
          next: (result) => {
            console.log('Plan de salle ajouté avec succès', result);
            this.dialogRef.close(result);
          },
          error: (error) => {
            console.error("'Erreur lors de l'ajout du plan de salle'", error);
          }
        });
      }
    } else {
      console.error('Le formulaire de plan de salle est invalide');
    }
  }
}