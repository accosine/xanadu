import { Countdown } from './src/components/countdown.ts';
import xanadu from './src/index.ts';

xanadu();
/**
 * Call the initializer a second time to test whether the component loader only
 * loads components once
 **/
xanadu();

/**
 * Register component without providing a name to test whether it registers
 * itself with its own name loads components once
 **/
Countdown.register();
