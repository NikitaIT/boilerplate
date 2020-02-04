import { DomainItem } from '../domain/DomainItem';
import { ItemField } from '../domain/ItemField';
import { ServerState } from '../domain/ServerState';
import { getRandomWithUpperBound, getRangeOf } from './utils';

export function subscribeToServerState(
  setServerState: (serverState: ServerState) => void,
  timeout: number = 2000,
): void {
  let seed = 1;
  window.setTimeout(() => {
    setServerState(createRandomServerState(seed));
    seed++;
  }, timeout);
}
export function createRandomServerState(seedId: number): ServerState {
  return {
    items: getRangeOf(getRandomWithUpperBound(10), createRandomItemFP(seedId)),
  };
}

function createRandomItemFP(seedId: number): (i: number) => DomainItem {
  return (i: number) => {
    return {
      id: i + seedId,
      fieldFirst: createField(),
      fieldSecond: createField(),
    };
  };
}

function createField(): ItemField {
  return {
    date: Date.now() - getRandomWithUpperBound(1000),
    value: getRandomWithUpperBound(1000),
  };
}
