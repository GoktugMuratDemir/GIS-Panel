/* eslint-disable import/no-extraneous-dependencies */
import merge from 'lodash/merge';
import { enUS as enUSAdapter, tr as trTRAdapter } from 'date-fns/locale';
// core
import { enUS as enUSCore, trTR as trTRCore } from '@mui/material/locale';
// date-pickers
import { enUS as enUSDate, trTR as trTRDate } from '@mui/x-date-pickers/locales';
// data-grid
import { enUS as enUSDataGrid, trTR as trTRDataGrid } from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  
  {
    label: 'Türkçe',
    value: 'tr',
    systemValue: merge(trTRDate,trTRDataGrid,trTRCore),
    adapterLocale: trTRAdapter,
    icon: 'flagpack:tr',
  },
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
];

export const defaultLang = allLangs[0]; // Türkçe

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
