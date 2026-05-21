import * as migration_20260519_164325_initial from './20260519_164325_initial';
import * as migration_20260521_195004_adds_button_block from './20260521_195004_adds_button_block';

export const migrations = [
  {
    up: migration_20260519_164325_initial.up,
    down: migration_20260519_164325_initial.down,
    name: '20260519_164325_initial',
  },
  {
    up: migration_20260521_195004_adds_button_block.up,
    down: migration_20260521_195004_adds_button_block.down,
    name: '20260521_195004_adds_button_block'
  },
];
