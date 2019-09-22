<script>
	import Comp from './Comp.svelte';
	import ListCard from './ListCard.svelte';
	import BindComp from './BindComp.svelte';

	export let name;

	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<style>
	h1 {
		color: red;
	}
	.container{
		width: 400px;
	}
</style>

<div class="container">
	<Comp />
	<ListCard />
	<BindComp />
	<!-- <h1>字體庫不是很完整，試試繁體: {name}!</h1> -->
	<!-- <button on:click={handleClick}>
		Clicked {count} {count === 1 ? 'time' : 'times'}
	</button> -->
</div>

