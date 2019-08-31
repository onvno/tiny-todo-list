<script>
	import Comp from './Comp.svelte';
	export let name;
</script>

<style>
	h1 {
		color: red;
	}
</style>

<Comp />
<h1>字體庫不是很完整，試試繁體: {name}!</h1>
