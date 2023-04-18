import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IRI} from "@janeirodigital/sai-api-messages";

@Component({
  selector: 'sai-add-social-agent-form',
  templateUrl: './add-social-agent-form.component.html',
  styleUrls: ['./add-social-agent-form.component.css']
})
export class AddSocialAgentFormComponent implements OnInit {

  @Input() webid: IRI | null = null;
  @Output() send = new EventEmitter<{webid: IRI, label: string, note: string}>();

  form = new FormGroup({
    webid: new FormControl<IRI>(''),
    label: new FormControl<string>(''),
    note: new FormControl<string>(''),
  });

  ngOnInit(): void {
    this.form.controls.webid.setValue(this.webid);
  }

  submitHandler(): void {

    const webid = this.form.get('webid')?.value;
    const label = this.form.get('webid')?.value;
    const note = this.form.get('webid')?.value || '';

    // TODO reject and inform to user
    if (!webid || !label) return;

    this.send.emit({webid, label, note});
  }
}
