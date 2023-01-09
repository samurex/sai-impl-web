import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Languages} from "../../languages";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'sai-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() languages = Languages;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');

    const browserLang: any  = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

}
