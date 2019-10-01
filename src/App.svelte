<script>
	import { onMount } from 'svelte';
	import { selectTab } from './stores.js';

	import Tab from './Tab.svelte';
	import ListCard from './ListCard.svelte';
	import BindComp from './BindComp.svelte';
	import AddNoteComp from './AddNoteComp.svelte';

	import { taskDB } from './model/index.js';


	export let name;
	let count = 0;

	function handleClick() {
		count += 1;
	}

	onMount(async () => {
		console.log('app mounted')
	})

</script>

<style>
	h1 {
		color: red;
	}
</style>

<div class="container">
	<Tab />
	<ListCard />
	<!-- <BindComp /> -->
	<AddNoteComp />
	<!-- <h1>字體庫不是很完整，試試繁體: {name}!</h1> -->
	<!-- <button on:click={handleClick}>
		Clicked {count} {count === 1 ? 'time' : 'times'}
	</button> -->
</div>

