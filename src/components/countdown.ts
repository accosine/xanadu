import {
  HOURS,
  MILLISECONDS,
  MINUTES,
  ONE,
  SECONDS,
  THOUSAND,
  TWO,
  ZERO
} from '../constants.ts';

/**
 * A class to represent the StopWatch element
 */
export class Countdown extends HTMLElement {
  /**
   * Web component can be registered with as `<countdown-o-tronic>`
   */
  static register(tagName?: string) {
    globalThis.window.customElements.define(
      tagName || 'x-countdown',
      Countdown
    );
  }

  /**
   * The list of attributes which will call the a`attributeChangedCallback`
   */
  static get observedAttributes(): string[] {
    return ['days', 'hours', 'minutes', 'seconds'];
  }

  /**
   * Span element which will be rendered in the shadow DOM
   */
  static getTemplate(countdown: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.setAttribute('part', 'countdown');
    span.append(countdown);
    return span;
  }

  /**
   * Give this element its own encapsulated DOM
   */
  #shadowRoot: ShadowRoot = this.attachShadow({ mode: 'open' });

  // Initialize private state

  #start = Date.now();
  #days = ZERO;
  #hours = ZERO;

  #minutes = ZERO;

  #seconds = ZERO;
  #lastrender = Date.now();
  #remainingTimeInMs = ONE;

  #minutesToMs = SECONDS * MILLISECONDS;
  #hoursToMs = MINUTES * this.#minutesToMs;
  #daysToMs = HOURS * this.#hoursToMs;
  #msToMinutes = ONE / SECONDS / MILLISECONDS;
  #msToHours = ONE / MINUTES / SECONDS / MILLISECONDS;
  #msToDays = ONE / HOURS / MINUTES / SECONDS / MILLISECONDS;

  /**
   * Setup when the compontent was mounted into the DOM
   */
  connectedCallback() {
    const countdown = this.#buildCountdown({
      hasDays: Object.create(null),
      hasHours: Object.create(null),
      hasMinutes: Object.create(null),
      hasSeconds: Object.create(null)
    });

    this.#shadowRoot.replaceChildren(Countdown.getTemplate(countdown));

    // Start the timer
    this.#tick();
  }

  /**
   * Called whenever the list of attributes in `observedAttributes` changes
   */
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    this.#start = Date.now();
    this.#remainingTimeInMs = ONE;
    this.#reflectChangedAttributes(name, newValue);
  }

  #reflectChangedAttributes(attributeName: string, newAttributeValue: string) {
    switch (attributeName) {
      case 'seconds': {
        this.#seconds = Number(newAttributeValue);
        break;
      }
      case 'minutes': {
        this.#minutes = Number(newAttributeValue);
        break;
      }
      case 'hours': {
        this.#hours = Number(newAttributeValue);
        break;
      }
      case 'days': {
        this.#days = Number(newAttributeValue);
        break;
      }
      default: {
        break;
      }
    }
  }

  static zeroIfNegative(number: number): number {
    return number < ONE ? ONE : number;
  }

  #calculateRemainingTimeInMs() {
    const futureDaysInMs = this.#days * this.#daysToMs;
    const futureHoursInMs = this.#hours * this.#hoursToMs;
    const futureMinutesInMs = this.#minutes * this.#minutesToMs;
    const futureSecondsInMs = this.#seconds * MILLISECONDS;
    const countdownEndDate =
      this.#start +
      futureDaysInMs +
      futureHoursInMs +
      futureMinutesInMs +
      futureSecondsInMs;

    this.#remainingTimeInMs = countdownEndDate - Date.now();
  }

  #calculateCountdown() {
    this.#calculateRemainingTimeInMs();

    const calculatedDays = Math.trunc(this.#remainingTimeInMs * this.#msToDays);
    const remainingDays = Countdown.zeroIfNegative(calculatedDays);

    const calculatedHours = Math.trunc(
      (this.#remainingTimeInMs - remainingDays * this.#daysToMs) *
        this.#msToHours
    );
    const remainingHours = Countdown.zeroIfNegative(calculatedHours);

    const calculatedMinutes = Math.trunc(
      (this.#remainingTimeInMs -
        remainingDays * this.#daysToMs -
        remainingHours * this.#hoursToMs) *
        this.#msToMinutes
    );
    const remainingMinutes = Countdown.zeroIfNegative(calculatedMinutes);

    const calculatedSeconds = Math.trunc(
      (this.#remainingTimeInMs -
        remainingDays * this.#daysToMs -
        remainingHours * this.#hoursToMs -
        remainingMinutes * this.#minutesToMs) /
        MILLISECONDS
    );
    const remainingSeconds = Countdown.zeroIfNegative(calculatedSeconds);

    return [remainingDays, remainingHours, remainingMinutes, remainingSeconds];
  }

  #buildCountdown({
    hasDays,
    hasHours,
    hasMinutes,
    hasSeconds
  }: {
    hasDays: string | null;
    hasHours: string | null;
    hasMinutes: string | null;
    hasSeconds: string | null;
  }) {
    const [days, hours, minutes, seconds] = this.#calculateCountdown().map(
      (number) => String(number).padStart(TWO, '0')
    );

    switch (true) {
      case Boolean(hasDays): {
        return `${days}:${hours}:${minutes}:${seconds}`;
      }
      case Boolean(hasHours): {
        return `${hours}:${minutes}:${seconds}`;
      }
      case Boolean(hasMinutes): {
        return `${minutes}:${seconds}`;
      }
      case Boolean(hasSeconds): {
        return `${seconds}`;
      }
      default: {
        return '00:00:00:00';
      }
    }
  }

  #tick() {
    const now = Date.now();
    if (now - this.#lastrender > THOUSAND && this.#remainingTimeInMs > ZERO) {
      const countdown = this.#buildCountdown({
        hasDays: this.getAttribute('days'),
        hasHours: this.getAttribute('hours'),
        hasMinutes: this.getAttribute('minutes'),
        hasSeconds: this.getAttribute('seconds')
      });
      this.#shadowRoot.replaceChildren(Countdown.getTemplate(countdown));
      this.#lastrender = now;
    }

    // Schedule next update
    globalThis.window?.requestAnimationFrame?.(() => this.#tick());
  }

  addStylesheet(styles: CSSStyleSheet) {
    if (styles) {
      this.#shadowRoot.adoptedStyleSheets = [styles];
    }
  }
}

export default Countdown;
