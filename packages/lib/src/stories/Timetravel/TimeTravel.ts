export interface TimeTravel {
  undo(): void;
  redo(): void;
  clear(): void;
  reduce<TState>(): TState;
}
