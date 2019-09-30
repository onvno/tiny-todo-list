<script>
  import { onMount } from 'svelte';
  
  import { todoCont } from './stores.js';
  import SingleCard from './SingleCard.svelte';

  import * as control from './controller/index.js';

  onMount(async () => {
    await control.searchStore('taskDB')
  })
</script>

<ul>
	{#each $todoCont as singleCont}
    <SingleCard {...singleCont} />
	{/each}
</ul>

