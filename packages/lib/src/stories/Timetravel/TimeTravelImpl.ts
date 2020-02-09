import { TimeTravel } from './TimeTravel';

export class TimeTravelImpl implements TimeTravel {
  undo(): void {
    throw new EvalError();
  }
  redo() {
    throw new EvalError();
  }
  clear() {
    throw new EvalError();
  }
  reduce<TState>(): TState {
    throw new EvalError();
  }
}
