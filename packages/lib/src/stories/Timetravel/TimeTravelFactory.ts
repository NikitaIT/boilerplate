import { TimeTravel } from './TimeTravel';
import { TimeTravelImpl } from './TimeTravelImpl';

export class TimeTravelFactory {
  create(): TimeTravel {
    return new TimeTravelImpl();
  }
}
