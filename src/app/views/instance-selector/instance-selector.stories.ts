import {moduleMetadata, Story} from "@storybook/angular";
import {DemoMaterialModule} from "../../../material-module";
import {InstanceSelectorComponent} from "./instance-selector.component";

export default {
  title: 'Instance Selector',
  component: InstanceSelectorComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [DemoMaterialModule],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Default = Template.bind({});
Default.args = {
  instances: [
    {id: 1, label: "Projectron v2"},
    {id: 2, label: "PM Master Acquisition"},
    {id: 3, label: "Projectron-next"},
    {id: 4, label: "TODO tracker"},
  ],
  registryIds: [
    'https://me.pod/registry/personal',
    'https://me.pod/registry/shared',
    'https://consulting.org/bob/projects',
    'https://alice.pod/registry/shared',
  ]
};
