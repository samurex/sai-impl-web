import { Story, moduleMetadata } from "@storybook/angular";
import { LanguageComponent } from "./language.component";
import { SbModule } from "../../../sb-module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

export default {
  title: 'Components/Language Selector',
  component: LanguageComponent,
  decorators: [
    moduleMetadata({
      imports: [SbModule,
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
