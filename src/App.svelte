<script>
	import { onMount } from 'svelte';
	import { selectTab } from './stores.js';

	import Tab from './Tab.svelte';
	import ListCard from './ListCard.svelte';
	import BindComp from './BindComp.svelte';
	import AddNoteComp from './AddNoteComp.svelte';

	import { taskDB } from './model/index.js';
	import { tabMapDB } from './config/constant.js';

	export let name;

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
	<div>{$selectTab}</div>
	<Tab />

	<ListCard DBName={tabMapDB[$selectTab]} />
	<!-- <BindComp /> -->
	<AddNoteComp />
	<!-- <h1>字體庫不是很完整，試試繁體: {name}!</h1> -->
</div>

