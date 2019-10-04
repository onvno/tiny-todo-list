<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';

  import { todoCont, completeCont, pendingCont, sortMode, sortOrder } from './store/index.js';
  import SingleCard from './SingleCard.svelte';

  import * as control from './controller/index.js';

  export let DBName;
  let selected;

  const handleSelectChange = async () => {
    sortMode.update(() => selected)
    await control.searchStore(DBName, selected, $sortOrder)
  }

  const handleOrderChange = async () => {
    sortOrder.update((bool) => !bool)
    await control.searchStore(DBName, $sortMode, $sortOrder)
  }

  const handleDeleteAll = async () => {
    const res = confirm('Sure to Delete All Items ?')
    if(res) {
      await control.clearStore(DBName, $sortMode, $sortOrder)
    }
  }

  onMount(async () => {
    await control.searchStore(DBName, $sortMode, $sortOrder)
  })

  beforeUpdate(() => {
    // console.log("DBName:", DBName)
    // console.log("completeCont:", $completeCont);
  })


</script>


<div class="select_zone">
  <div class="sort">
    <select bind:value={selected} class="sortlist" on:change={handleSelectChange}>
      <option value='time'>Sort: Update Time</option>
      <option value='id'>Sort: Create Time</option>
      {#if DBName !== 'completeDB'}
        <option value='progress'>Sort: Progress</option>
      {/if}
    </select>
    <div class={$sortOrder ? 'active sort_btn' : 'sort_btn'} on:click={handleOrderChange}>
      <svg t="1569985988710" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9275" width="18" height="18" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M389 64a36 36 0 0 0-36 36v699.06L183.77 602.63a36 36 0 0 0-50.77-3.77 36 36 0 0 0-3.78 50.77L361.73 919.5a36 36 0 0 0 43.45 8.66A36.58 36.58 0 0 0 425 895.33V100a36 36 0 0 0-36-36zM894.78 346.37L662.27 76.5a36 36 0 0 0-43.45-8.66A36.6 36.6 0 0 0 599 100.67V896a36 36 0 0 0 36 36 36 36 0 0 0 36-36V196.94l169.23 196.43a36 36 0 0 0 50.77 3.77 36 36 0 0 0 3.78-50.77z" p-id="9276" fill="#cdcdcd"></path></svg>
    </div>
  </div>
  {#if DBName !== 'taskDB'}
  <div class="del">
    <div class="del_all" on:click={handleDeleteAll}>Delete All</div>
  </div>
  {/if}
  
</div>


<ul>
  {#if DBName === 'taskDB'}
  	{#each $todoCont as singleCont}
      <SingleCard {...singleCont} DBName={DBName} />
    {/each}
  {:else if DBName === 'completeDB'}
  	{#each $completeCont as singleCont}
      <SingleCard {...singleCont} DBName={DBName} />
    {/each}
  {:else}
  	{#each $pendingCont as singleCont}
      <SingleCard {...singleCont} DBName={DBName} />
    {/each}
  {/if}
</ul>

<style>
.select_zone{
  padding: 10px;
  overflow: hidden;
}
.sort{
  float: left;
}
.del{
  float: right;
}
.del_all {
  transition: all ease-in 0.3s;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 18px;
  padding: 6px 12px;
  cursor: pointer;
  background:#f1f1f1;
}
.del_all:hover {
  background:#d84040;
  color: #fff;
}
.sort_btn {
  float:left;
  padding: 7px 4px 4px;
  margin-left:4px;
  cursor: pointer;
}

.sort_btn:hover svg path, .sort_btn.active svg path{
  fill: #f99292;
}

select {
  float: left;
  cursor: pointer;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  display: inline-block;
  font: inherit;
  line-height: 18px;
  padding: 6px 12px;

  /* reset */
  margin: 0;      
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}



</style>