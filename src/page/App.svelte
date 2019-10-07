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

	let hereKitty = false;

	const handleMouseenter = () => hereKitty = true;
	const handleMouseleave = () => hereKitty = false;

</script>

<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
/>
<img
	class:curious={hereKitty}
	alt="Kitten wants to know what's going on"
	src="./img/kitten.png"
>

<style>
	img {
		position: absolute;
		left: 0;
		bottom: -60px;
		transform:scale(0.5) translate(-157%, 0) rotate(-19deg);
		/* transform: scale(0.5) translate(-15%, 0) rotate(0deg); */
		transform-origin: 100% 100%;
		transition: transform 0.4s;
		z-index: 1;
		opacity: 0.7;
	}

	.curious {
		transform: scale(0.5) translate(-122%, 0) rotate(0deg);
	}

	:global(body) {
		overflow: hidden;
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

