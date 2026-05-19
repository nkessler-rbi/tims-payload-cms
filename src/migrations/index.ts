import * as migration_20260519_164325_initial from './20260519_164325_initial';

export const migrations = [
  {
    up: migration_20260519_164325_initial.up,
    down: migration_20260519_164325_initial.down,
    name: '20260519_164325_initial'
  },
];
