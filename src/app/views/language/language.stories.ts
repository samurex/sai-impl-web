import { Story, moduleMetadata } from "@storybook/angular";
import { LanguageComponent } from "./language.component";
import { DemoMaterialModule } from "../../../material-module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

export default {
  title: 'Language Selector',
  component: LanguageComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en'
        }),
      ],
      providers: [TranslateService],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const LanguageSelectClose = Template.bind({});
LanguageSelectClose.args = {
  languages: [
    {
      label: 'English',
      id: 'en'
    },
    {
      label: 'Español',
      id: 'es'
    }
  ],
};
