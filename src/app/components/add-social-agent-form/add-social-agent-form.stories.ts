import {moduleMetadata, Story} from "@storybook/angular";
import {SbModule} from "../../../sb-module";
import {AddSocialAgentFormComponent} from "./add-social-agent-form.component";

export default {
  title: 'Components/Add Social Agent Form',
  component: AddSocialAgentFormComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [SbModule],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Default = Template.bind({});
Default.args = {
  webid: null,
};

export const WithWebId = Template.bind({});
WithWebId.args = {
  webid: 'https://alice.me/id',
}
