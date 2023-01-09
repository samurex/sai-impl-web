
import { Story, moduleMetadata } from '@storybook/angular';
import { NavbarComponent } from "./navbar.component";
import { DemoMaterialModule } from "../../../material-module";

export default {
  title: 'Navbar',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule],
    })
  ]
};

const Template: Story = (args) => ({props: args});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  webId: 'https://solid.provider/user/profile/card#me',
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
