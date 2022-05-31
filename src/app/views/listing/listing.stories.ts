
import { Story, moduleMetadata } from '@storybook/angular';
import { ListingComponent } from "./listing.component";
import {DemoMaterialModule} from "../../../material-module";
import { Application } from "../../view-models";

export default {
  title: 'Listing',
  component: ListingComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule],
    })
  ]
};

const Template: Story = (args) => ({props: args});

export const Applications = Template.bind({});
Applications.args = {
  app: <Application>{
    thumbnail: 'https://www.logolynx.com/images/logolynx/19/1995ca9f3bbe07dccc79cba97fe4067e.png',
    name: 'Genetic Insights',
    description: 'This service digitizes your genetic profile, and stores it back into your data pod, along a bevy ' +
      'of insights and analysis',
    url: 'View',
  }
}

