<script>
	import { onMount } from 'svelte';

	import Comp from './Comp.svelte';
	import ListCard from './ListCard.svelte';
	import BindComp from './BindComp.svelte';
	import AddNoteComp from './AddNoteComp.svelte';

	export let name;
	let count = 0;

	function handleClick() {
		count += 1;
	}

	onMount(async () => {
		console.log('app mounted!')

		// 加载时连接indexedDB
		var db = new Dexie("todo");
		db.version(1).stores({
			todolist: 'time, title, desc, progress'
		});

		var timer = new Date().getTime();

		//
		// Put some data into it
		//
		db.todolist.put({time: timer, title: 'ttttt', desc: 'dddddd', progress: '50'}).then (function(){
			//
			// Then when data is stored, read from it
			//
			return db.todolist.get(timer);
		}).then(function (friend) {
			//
			// Display the result
			//
			console.log ("timer:", friend);
		}).catch(function(error) {
			//
			// Finally don't forget to catch any error
			// that could have happened anywhere in the
			// code blocks above.
			//
			alert ("Ooops: " + error);
		});


	})
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
	<AddNoteComp />
	<!-- <h1>字體庫不是很完整，試試繁體: {name}!</h1> -->
	<!-- <button on:click={handleClick}>
		Clicked {count} {count === 1 ? 'time' : 'times'}
	</button> -->
</div>

