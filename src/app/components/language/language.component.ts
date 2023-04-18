import {Component, Input} from '@angular/core';
import {Languages} from "../../languages";
import {TranslateService} from "@ngx-translate/core";
import {CORE_LANGUAGE_KEY, initialState, preferLanguage} from "../../state/reducers/core.reducer";
import {faLanguage} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'sai-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {
  faLanguage = faLanguage;

  @Input() languages = Languages;

  constructor(public translate: TranslateService) {
    const browserLang: string = initialState.language;
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }

  onChange(selectEvent: Event) {
    const { target } = selectEvent;
    if (!target) return;

    const languageSelectedValue: string = (<HTMLSelectElement>target).value;
    this.translate.use(languageSelectedValue);
    //Set localStorage with user prefer language
    preferLanguage.language = languageSelectedValue;
    window.localStorage.setItem(CORE_LANGUAGE_KEY, JSON.stringify(preferLanguage));
  }

}
