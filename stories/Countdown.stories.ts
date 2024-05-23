/**
 * Note that we explicitly DO NOT load the web component here.
 * All web component setup is done in `.storybook/preview.ts`.
 */
import { html } from 'lit';
import type { Meta } from '@storybook/web-components';

const meta = {
  argTypes: {
    days: { control: 'number' },
    hours: { control: 'number' },
    minutes: { control: 'number' },
    seconds: { control: 'number' }
  },
  component: 'CountdownExample',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  title: 'Example/Countdown'
} satisfies Meta<any>;
export default meta;

export const Primary = {
  args: {
    days: '1',
    hours: '2',
    minutes: '44',
    seconds: '38'
  },
  render: ({ days, hours, minutes, seconds }) =>
    html`<x-countdown
      days="${days}"
      hours="${hours}"
      minutes="${minutes}"
      seconds="${seconds}"
    ></x-countdown>`
};
