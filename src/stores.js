import { writable } from 'svelte/store';

export const selectTab = writable(0);

export const listCont = writable([
  {
    'title': 'Here is Title<i>展开</i> <i>编辑</i> <i>删除</i> <i>完成度：30%</i>',
    'desc': 'Here is the description, Here is the description, Here is the description',
  },
  {
    'title': 'Here is Title',
    'desc': 'Here is the description, Here is the description, Here is the description',
  }
])