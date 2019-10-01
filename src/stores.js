import { writable } from 'svelte/store';

export const selectTab = writable(0);

export const todoCont = writable([
  {
    'title': '',
    'desc': '',
    'progress': 0,
    'time': null,
    'id': null,
  },
])

export const completeCont = writable([
  {
    'title': '',
    'desc': '',
    'progress': 100,
    'time': null,
    'id': null,
  },
])

export const recycleCont = writable([
  {
    'title': '',
    'desc': '',
    'progress': 100,
    'time': null,
    'id': null,
  },  
])