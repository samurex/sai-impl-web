import {moduleMetadata, Story} from "@storybook/angular";
import {AccessNeedViewComponent} from "./access-need-view.component";
import {DemoMaterialModule} from "../../../material-module";

export default {
  title: 'Access Need View',
  component: AccessNeedViewComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Required = Template.bind({});
Required.args = {
  need: {
    id: 'http://localhost:3000/acme/projectron/access-needs#need-project',
    label: 'Access to Projects is essential for Projectron to perform its core function of Project Management',
    required: true,
    access: [
      'http://www.w3.org/ns/auth/acl#Read',
      'http://www.w3.org/ns/auth/acl#Create',
      'http://www.w3.org/ns/auth/acl#Update',
      'http://www.w3.org/ns/auth/acl#Delete'
    ],
    shapeTree:['http://localhost:3000/shapetrees/trees/Project'],
  },
  shapetree: {
    id: 'http://localhost:3000/shapetrees/trees/Project',
    label: 'Projects',
  },
  registryIds: [
    'https://alice.pod.me/projects/personal',
    'https://alice.pod.me/projects/work',
    'https://bob.pod.me/projects/shared',
  ]
}

export const Optional = Template.bind({});
Optional.args = {
  need: {
    ...Required.args['need'],
    required: false,
  },
  shapetree: Required.args['shapetree'],
  registryIds: Required.args['registryIds']
}
