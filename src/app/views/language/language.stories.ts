import { Story, moduleMetadata } from "@storybook/angular";
import { LanguageComponent } from "./language.component";
import { DemoMaterialModule } from "../../../material-module";

export default {
  title: 'Language Selector',
  component: LanguageComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const LanguageSelectClose = Template.bind({});
LanguageSelectClose.args = {
  languageSelector: ['English', 'Español', 'Deutsch'],
};
