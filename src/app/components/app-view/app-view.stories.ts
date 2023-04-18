import {moduleMetadata, Story} from "@storybook/angular";
import {AppViewComponent} from "./app-view.component";
import {SbModule} from "../../../sb-module";

export default {
  title: 'Components/App View',
  component: AppViewComponent,
  decorators: [
    moduleMetadata({
      imports: [SbModule],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Default = Template.bind({});
Default.args = {
  expanded: true,
  application: {
    name: 'Projectron',
    logo: 'assets/icons/icon-512x512.png',
    authorizationDate: new Date(1395555555555).toDateString(),
    lastUpdateDate: new Date(1649555555555).toDateString(),
    accessNeedGroup: 'http://localhost:3000/acme/projectron/access-needs#need-group-pm',    // interop:hasAccessNeedGroup
  },
  group: {
    id: 'http://localhost:3000/acme/projectron/access-needs#need-group-pm',
    label: 'Core Access Needs',
    description: 'These are the required access for Projectron to perform its basic functionality',
  },
  needs: [
    {
      id: 'http://localhost:3000/acme/projectron/access-needs#need-project',
      label: 'Access to Projects is essential for Projectron to perform its core function of Project Management',
      required: true,
      access: [
        'http://www.w3.org/ns/auth/acl#Read',
        'http://www.w3.org/ns/auth/acl#Create',
        'http://www.w3.org/ns/auth/acl#Update',
        'http://www.w3.org/ns/auth/acl#Delete'
      ],
      shapeTree: 'http://localhost:3000/shapetrees/trees/Project',
    },
    {
      id: 'http://localhost:3000/acme/projectron/access-needs#need-task',
      label: 'Access to Tasks allows Projectron to identify and manage the work to be done in a given Project.',
      required: false,
      access: [
        'http://www.w3.org/ns/auth/acl#Read',
        'http://www.w3.org/ns/auth/acl#Create',
        'http://www.w3.org/ns/auth/acl#Update',
        'http://www.w3.org/ns/auth/acl#Delete'
      ],
      shapeTree: 'http://localhost:3000/shapetrees/trees/Task',
      parent: 'http://localhost:3000/acme/projectron/access-needs#need-project',
    }
  ],
  shapetrees: [
    {
      id: 'http://localhost:3000/shapetrees/trees/Task',
      label: 'Tasks'
    },
    {
      id: 'http://localhost:3000/shapetrees/trees/Project',
      label: 'Projects'
    }
  ]
};

export const LoadingNeeds = Template.bind({});
LoadingNeeds.args = {
  ...Default.args,
  accessNeeds: null,
}
