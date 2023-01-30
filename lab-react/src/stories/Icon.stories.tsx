import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UiIcons } from '../components/UiIcons';

export default {
  title: 'UiIcons',
  component: UiIcons,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   icon: 'home',
  // },
} as ComponentMeta<typeof UiIcons>;

const Template: ComponentStory<typeof UiIcons> = (args) => (
  <UiIcons {...args} />
);

export const Home = Template.bind({});
Home.args = {
  icon: 'home',
};
