
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

export const LoggedIn_NotificationsDisabled = Template.bind({});
LoggedIn_NotificationsDisabled.args = {
  webId: 'https://solid.provider/user/profile/card#me',
  isLoggedIn: true,
  withNotificationsAction: true,
};

export const LoggedIn_NotificationsEnabled = Template.bind({});
LoggedIn_NotificationsEnabled.args = {
  webId: 'https://solid.provider/user/profile/card#me',
  isLoggedIn: true,
  withNotificationsAction: false,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
