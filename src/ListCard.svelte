<script>
  import { onMount, beforeUpdate } from 'svelte';

  import { todoCont, completeCont, pendingCont } from './stores.js';
  import SingleCard from './SingleCard.svelte';

  import * as control from './controller/index.js';

  export let DBName;

  onMount(async () => {
    await control.searchStore(DBName)
  })

  beforeUpdate(() => {
    console.log("DBName:", DBName)
    console.log("completeCont:", $completeCont);
  })

</script>

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

