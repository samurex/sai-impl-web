
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ConsentPanelComponent } from "./consent-panel.component";
import {DemoMaterialModule} from "../../../material-module";

export default {
  title: 'Consent Panel',
  component: ConsentPanelComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule],
    })
  ]
};

const Template: Story = (args) => ({props: args});

export const Normal = Template.bind({});
Normal.args = {
  consent: {
    id: 'consent-001',
    name: 'Janeiro Digital\'s Projectron',
    description: 'Take control of your projects!',
    author: 'Janeiro Digital',
    authorUrl: 'https://janeirodigital.com',
    authorizationDate: new Date(),
    icon: 'data:image/png;base64,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',
  },
  groups: [
    {
      id: 'consent-group-001',
      name: 'View your Projects',
      description: 'Enabling access to the below types of information allows Projectron to access your projects',
      needs: [
        {
          id: 'consent-need-001',
          name: 'Access Need 001',
          description: 'Description for access needs 001',
          accessLevel: ['read']
        },
        {
          id: 'consent-need-002',
          name: 'Access Need 002',
          description: 'Description for access needs 002',
          accessLevel: ['write']
        },
        {
          id: 'consent-need-005',
          name: 'Access Need 005',
          description: 'Description for access needs 005',
          accessLevel: ['read', 'write']
        },
      ]
    },
    {
      id: 'consent-group-002',
      name: 'View your Tasks',
      description: 'Allows Projectron to view, edit and share your tasks with other.',
      needs: [
        {
          id: 'consent-need-004',
          name: 'Access Need 004',
          description: 'Description for access needs 004',
          accessLevel: ['control']
        },
        {
          id: 'consent-need-003',
          name: 'Access Need 003',
          description: 'Description for access needs 003',
          accessLevel: ['control']
        },
      ]
    }
  ]
}
