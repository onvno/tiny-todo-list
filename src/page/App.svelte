<script>
	import { onMount } from 'svelte';
	import { selectTab } from '../store/index.js';

	import Tab from '../component/Tab.svelte';
	import ListCard from '../component/ListCard.svelte';
	import BindComp from '../component/BindComp.svelte';
	import AddNoteComp from '../component/AddNoteComp.svelte';

	import { taskDB } from '../model/index.js';
	import { tabMapDB } from '../config/constant.js';

	export let name;

	onMount(async () => {
		console.log('app mounted')

		try {
			chrome.runtime.connect()
		} catch (error) {
			console.log('connect error:', error)
		}
	})

</script>

<style>
	h1 {
		color: red;
	}
</style>

<div class="container">
	<!-- <div>{$selectTab}</div> -->
	<Tab />

	<ListCard DBName={tabMapDB[$selectTab]} />
	<!-- <BindComp /> -->
	<AddNoteComp />
	<!-- <h1>字體庫不是很完整，試試繁體: {name}!</h1> -->
</div>

