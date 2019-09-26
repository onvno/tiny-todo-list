<script>
  import { listCont } from './stores.js';
  import SingleCard from './SingleCard.svelte';

</script>

<ul>
	{#each $listCont as singleCont}
    <SingleCard {...singleCont} />
	{/each}
</ul>

