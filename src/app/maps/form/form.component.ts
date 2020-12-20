import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  descriptionControl: FormControl = new FormControl(this.description);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public description: string,
    public ref: MatDialogRef<FormComponent>
  ) {}

  ngOnInit(): void {}

  save() {
    this.ref.close(this.descriptionControl.value);
  }
}
