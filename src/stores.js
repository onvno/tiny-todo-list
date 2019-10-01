import { writable } from 'svelte/store';

export const selectTab = writable("todo");

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
  },
])

export const pendingCont = writable([
  {
    'title': '',
    'desc': '',
    'progress': 100,
    'time': null,
  },  
])