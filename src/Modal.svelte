<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class='modal-background' on:click='{() => dispatch("close")}'></div>

<div class='modal'>
	<slot name='header'></slot>
	<hr>

  <h4>Master Mode</h4>
  <div class="mode">
    <span>Max Task Numbers: </span><input type="number" min="1" />
  </div>
  <div class="mode">
    <span>Auto Forgotten Days:</span><input type="number" min="1" />
  </div>
  <hr>
  <h4>Export</h4>
  <p>New publish version will update !</p>
	<span class="close" on:click='{() => dispatch("close")}'>×</span>
</div>



<style>
  p, span{
    color: #666;
  }
  h4{
    margin-bottom: 10px;
  }
  hr + h4 {
    margin-top: 10px;
  }
	.modal-background {
    z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.3);
	}

	.modal {
    z-index: 100;
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 12px 12px 15px;;
		border-radius: 5px;
		background: white;
  }

  .mode {
    margin-bottom: 10px;
  }
  .mode span {
    display: inline-block;
    width: 130px;
  }
  .mode input {
    color: #666;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    display: inline-block;
    line-height: 18px;
    padding: 6px 12px;
    width: 160px;
  }
  .close{
    transition: background ease-in 0.4s;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    width: 20px;
    height: 20px;
    text-align: center;
    background: #ccc;
    border-top-right-radius: 5px;
    line-height: 20px;
    color: #fff;
  }
  .close:hover{
    background: #d84040;
  }

  button {
		display: block;
	}
</style>