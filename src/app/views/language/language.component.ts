import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

// TODO export type somewhere more visible
export type Language = string;

@Component({
  selector: 'sai-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() languages = new Array<Language>();
  @Output() selectedLanguage = new EventEmitter<Language>();

  constructor() { }

  ngOnInit(): void {
  }

  public handleSelectLanguage(language: Language): void {
    this.selectedLanguage.emit(language);
  }

}
