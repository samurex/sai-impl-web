import {Component, OnInit, Input} from '@angular/core';
import {Languages} from "../../languages";
import {TranslateService} from "@ngx-translate/core";
import {CORE_LANGUAGE_KEY, initialState, preferLanguage} from "../../state/reducers/core.reducer";

@Component({
  selector: 'sai-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() languages = Languages;

  constructor(public translate: TranslateService) {
    const browserLang: string = initialState.language;
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  onChange(languageValue: any) {
    //Set user prefer language
    const languageSelectedValue: string = languageValue.target.value;
    this.translate.use(languageSelectedValue);
    //Set localStorage with user prefer language
    preferLanguage.language = languageSelectedValue;
    window.localStorage.setItem(CORE_LANGUAGE_KEY, JSON.stringify(preferLanguage));
  }

}
