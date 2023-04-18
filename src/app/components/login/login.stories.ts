import {moduleMetadata, Story} from "@storybook/angular";
import {LoginComponent} from "./login.component";
import {SbModule} from "../../../sb-module";

export default {
  title: 'Components/Log In',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [SbModule],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Default = Template.bind({});
Default.args = {}
