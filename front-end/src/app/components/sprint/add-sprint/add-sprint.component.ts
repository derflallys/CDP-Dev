import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Sprint} from '../../../models/sprint';
import {SprintService} from '../../../services/sprint.service';


@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.css']
})
export class AddSprintComponent implements OnInit {
  addSprint: FormGroup;
  sprint: Sprint;
  title = 'Ajouter un sprint';


  constructor(private formBuilder: FormBuilder, private sprintService: SprintService) { }

  ngOnInit() {
    this.addSprint = this.formBuilder.group({
      number: ['', Validators.required],
      title: [1, Validators.required],
      Sdate: ['', Validators.required],
      Edate: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.addSprint.invalid) { return; }
    const num = Number(this.addSprint.controls.number.value);
    const title = this.addSprint.controls.title.value;
    const Sdate = this.addSprint.controls.Sdate.value;
    const Edate = this.addSprint.controls.Edate.value;

    const newSprint = new Sprint(num, title, Sdate, Edate);
    console.log(newSprint);
    this.sprintService.addSprint(newSprint).subscribe(res => {
      console.log(res);
    });
  }
}
