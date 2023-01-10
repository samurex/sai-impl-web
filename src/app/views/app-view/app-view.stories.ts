import {moduleMetadata, Story} from "@storybook/angular";
import {AppViewComponent} from "./app-view.component";
import {DemoMaterialModule} from "../../../material-module";
import {AccessNeedViewComponent} from "../access-need-view/access-need-view.component";

export default {
  title: 'App View',
  component: AppViewComponent,
  decorators: [
    moduleMetadata({
      declarations: [AccessNeedViewComponent],
      imports: [DemoMaterialModule],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Default = Template.bind({});
Default.args = {
  expanded: true,
  application: {
    name: 'Projectron',
    logo: 'http://localhost:5000/assets/projectron.png',
    authorizationDate: new Date(1395555555555).toDateString(),
    lastUpdateDate: new Date(1649555555555).toDateString(),
    accessNeedGroup: 'http://localhost:3000/acme/projectron/access-needs#need-group-pm',    // interop:hasAccessNeedGroup
  },
  accessNeedGroup: {
    id: 'http://localhost:3000/acme/projectron/access-needs#need-group-pm',
    label: 'Access Need Group Label',
    description: 'Access Need Group Description',
  },
  accessNeeds: [
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
      shapeTree: {
        id: 'http://localhost:3000/shapetrees/trees/Project',
        label: 'Projects'
      },
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
      shapeTree: {
        id: 'http://localhost:3000/shapetrees/trees/Task',
        label: 'Tasks'
      },
      parent: 'http://localhost:3000/acme/projectron/access-needs#need-project',
    }
  ],
};

export const LoadingNeeds = Template.bind({});
LoadingNeeds.args = {
  ...Default.args,
  accessNeeds: null,
}
