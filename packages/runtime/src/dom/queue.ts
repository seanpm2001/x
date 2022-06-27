import type { Scope } from "../common/types";
import type { Signal } from "./signals";
import { schedule } from "./schedule";

const enum BatchOffsets {
  SCOPE = 0,
  SIGNAL = 1,
  VALUE = 2,
  TOTAL = 3
}

const enum HydrateOffsets {
  SCOPE = 0,
  FN = 1,
  TOTAL = 2
}

type ExecFn<S extends Scope = Scope> = (scope: S, arg?: any) => void;

let currentBatch: unknown[] = [];
let currentHydrate: unknown[] = [];


export function queueSource(scope: Scope, signal: Signal, value: unknown) {
  schedule();
  signal.___mark(scope);
  currentBatch.push(scope, signal, value);
}

export function queueHydrate<S extends Scope, T extends ExecFn<S>>(
  scope: S,
  fn: T
) {
  currentHydrate.push(scope, fn);
}

export function run() {
  try {
    for (let i = 0; i < currentBatch.length; i += BatchOffsets.TOTAL) {
      const scope = currentBatch[i + BatchOffsets.SCOPE] as Scope;
      const signal = currentBatch[i + BatchOffsets.SIGNAL] as Signal;
      const value = currentBatch[i + BatchOffsets.VALUE] as unknown;
      signal.___apply(scope, value);
    }
  } finally {
    currentBatch = [];
  }
  runHydrate();
}

export function runHydrate() {
  try {
    for (let i = 0; i < currentHydrate.length; i+=HydrateOffsets.TOTAL) {
      const scope = currentHydrate[i] as Scope;
      const fn = currentHydrate[i+1] as (scope: Scope) => void;
      fn(scope);
    }
  } finally {
    currentHydrate = [];
  }
}