/**
 * Note that we explicitly DO NOT load the web component here.
 * All web component setup is done in `.storybook/preview.ts`.
 */
import { html } from 'lit';

/**
 * The Countdonw component shows a countdown for days, hours, minutes and seconds
 */
const meta = {
  argTypes: {
    days: { control: 'number' },
    hours: { control: 'number' },
    minutes: { control: 'number' },
    seconds: { control: 'number' }
  },
  component: 'Countdown',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  title: 'Components/Countdown'
};
export default meta;

/**
 * # The Kitchen Sink
 * Shows a countdown component with days, hours, minutes and seconds parametrized
 */
export const FullCountdown = {
  args: {
    days: '1',
    hours: '2',
    minutes: '44',
    seconds: '38'
  },
  render: ({ days = '1', hours = '2', minutes = '44', seconds = '38' }) => html`
    <x-countdown
      days="${days}"
      hours="${hours}"
      minutes="${minutes}"
      seconds="${seconds}"
    ></x-countdown>
  `
};

/**
 * # Countdown with days
 * Only days are parametrized, hours, minutes and seconds are automatically calculated
 */
export const OnlyDaysAsAttribute = {
  render: ({ days = '2' }) => html`<x-countdown days="${days}"></x-countdown>`
};

/**
 * # Countdown with hours
 * Only hours are parametrized, minutes and seconds are automatically calculated
 */
export const OnlyHoursAsAttribute = {
  render: ({ hours = '3' }) =>
    html`<x-countdown hours="${hours}"></x-countdown>`
};

/**
 * # Countdown with minutes
 * Only minutes are parametrized, seconds are automatically calculated
 */
export const OnlyMinutesAsAttribute = {
  render: ({ minutes = '45' }) =>
    html`<x-countdown minutes="${minutes}"></x-countdown>`
};

/**
 * # Countdown with seconds
 * Only seconds are parametrized, nothing else is calculated or displayed
 */
export const OnlySecondsAsAttribute = {
  render: ({ seconds = '60' }) =>
    html`<x-countdown seconds="${seconds}"></x-countdown>`
};

/**
 * # Countdown with custom styling from the outside
 * Styling is provided via custom propertiers
 */
export const WithStylesViaCustomProperties = {
  render: ({ seconds = '60' }) => html`
    <style>
      x-countdown.viacustomproperty {
        --bg-countdown: rgb(255, 140, 0);
        --color-countdown: rgb(47, 35, 14);
      }
    </style>
    <x-countdown class="viacustomproperty" seconds="${seconds}"></x-countdown>
  `
};

/**
 * # Countdown with custom styling from the outside
 * Styling is provided via ::part CSS pseudo element
 */
export const WithStylesViaPart = {
  render: ({ days = '1', hours = '2', minutes = '44', seconds = '38' }) => html`
    <style>
      x-countdown.viapart::part(countdown) {
        background-color: rgb(82, 57, 126);
        color: white;
      }
    </style>
    <x-countdown
      class="viapart"
      days="${days}"
      hours="${hours}"
      minutes="${minutes}"
      seconds="${seconds}"
    ></x-countdown>
  `
};
