import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { IRI } from "@janeirodigital/sai-api-messages";

@Component({
  selector: 'sai-add-social-agent-form',
  templateUrl: './add-social-agent-form.component.html',
  styleUrls: ['./add-social-agent-form.component.scss']
})
export class AddSocialAgentFormComponent implements OnInit {

  @Input() webid: IRI | null = null;
  @Output() submit = new EventEmitter<{webid: IRI, label: string, note: string}>();

  form = new FormGroup({
    webid: new FormControl<IRI>(''),
    label: new FormControl<string>(''),
    note: new FormControl<string>(''),
  });

  constructor() { }

  ngOnInit(): void {
    this.form.controls.webid.setValue(this.webid);
  }

  onSubmit(): void {
    this.submit.emit({
      webid: this.form.get('webid')?.value!,
      label: this.form.get('label')?.value!,
      note: this.form.get('note')?.value || '',
    });
  }
}
