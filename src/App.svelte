<script>
	import { onMount } from 'svelte';
	import { todoStore } from './stores.js';

	import Comp from './Comp.svelte';
	import ListCard from './ListCard.svelte';
	import BindComp from './BindComp.svelte';
	import AddNoteComp from './AddNoteComp.svelte';

	import todoDB from './utils/index.js';

	export let name;
	let count = 0;

	function handleClick() {
		count += 1;
	}

	onMount(async () => {
		console.log('app mounted:', todoDB)

		var time = new Date().getTime();

		try {
			const saveRes = await todoDB.save({ time, title: 'ttttt', desc: 'dddddd', progress: '50%' });

			const totalRes = await todoDB.search()
			// todoDB.update(saveRes.id, Object.assign({}, saveRes, {prgress: 99, desc: '111111', title: '22222', time: '33333'}))

			todoStore.update(() => totalRes)

			// todoDB.update(time, {title, desc, progress: 99})
		} catch (error) {
			console.error('db error:', error);
		}
		

		// setTimeout(todoDB.delete(time), 1000)
		// setTimeout(todoDB.update())
	})
</script>

<style>
	h1 {
		color: red;
	}
</style>

<div class="container">
	<Comp />
	<ListCard />
	{#each $todoStore as singleTodo}
    <div>
			<h4>{singleTodo.title}</h4>
			<p>{singleTodo.desc}</p>
		</div>
	{/each}
	<!-- <BindComp /> -->
	<AddNoteComp />
	<!-- <h1>字體庫不是很完整，試試繁體: {name}!</h1> -->
	<!-- <button on:click={handleClick}>
		Clicked {count} {count === 1 ? 'time' : 'times'}
	</button> -->
</div>

