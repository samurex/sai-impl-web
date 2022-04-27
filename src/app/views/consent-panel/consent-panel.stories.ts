
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ConsentPanelComponent } from "./consent-panel.component";
import {DemoMaterialModule} from "../../../material-module";
import { Application, AccessNeedGroup } from "../../view-models";

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
  profile: <Application>{
    id: 'consent-001',
    name: 'Projectron',
    description: 'Take control of your projects!',
    author: 'Projectron Corporation',
    url: 'https://projectron.corp/',
    thumbnail: 'http://localhost:3000/projectron/profile/logo.svg',
    authorizationDate: '2021-02-07T18:30:51.017Z',
    lastUpdateDate: '2021-10-12T11:25:16.017Z',
  },
  groups: [
    {
      id: 'access-group-001',
      title: "Projects & Tasks",
      description: "Access to your projects & tasks",
      required: true,
      needs: [
        {
          id: 'access-01',
          title: 'Projects',
          description: 'Access to your projects',
          required: true,
          access: ['read', 'write'],
        },
        {
          id: 'access-02',
          title: 'Tasks',
          description: 'Access to your tasks',
          required: true,
          access: ['read', 'write'],
        },
      ]
    },
  ] as Array<AccessNeedGroup>
}

export const NormalNew = Template.bind({});
NormalNew.args = {
  profile: <Application>{
    id: 'consent-002',
    name: 'Mairano Romero',
    description: 'Dev Developer',
    author: 'Janeiro Digital',
    url: 'https://projectron.corp/',
    thumbnail: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5af797af34756d0a4ca17584/ddb48c0d-be28-439c-b5aa-5e255067755f/48',
    authorizationDate: '2021-02-07T18:30:51.017Z',
    lastUpdateDate: '2021-10-12T11:25:16.017Z',
  },
  groups: [
    {
      id: 'access-group-002',
      title: "Projects & Tasks",
      description: "Access to your projects & tasks",
      required: true,
      needs: [
        {
          id: 'access-01',
          title: 'Projects',
          description: 'Access to your projects',
          required: true,
          access: ['read', 'write'],
        },
        {
          id: 'access-02',
          title: 'Tasks',
          description: 'Access to your tasks',
          required: true,
          access: ['read', 'write'],
        },
      ],
    },
  ] as Array<AccessNeedGroup>
}
