<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  import { configCont } from './stores.js';
  import { configDB } from  './model/index.js';

  const dispatch = createEventDispatcher();
  
  onMount(async () => {
    const data = await configDB.search();
    
    // db exist to coverage store 
    if( data.length) {
      configCont.update(() => data[0])
    }
  })


  const handleNumberSave = async () => {
    const data = await configDB.search();
    const { number, day } = $configCont;

    // handle add or update
    if( !data.length ) {
      configDB.save({number, day, time: new Date().getTime(), id: 0})
    } else {
      configDB.update(0, Object.assign({}, data[0], {number, day,  time: new Date().getTime()}))
    }

    dispatch("close")
  }


</script>

<div class='modal-background' on:click='{() => dispatch("close")}'></div>

<div class='modal' in:fly="{{ y: 150, duration: 1000 }}" out:fade>
	<slot name='header'></slot>
	<hr>

  <div class="base_wrap">
    <h4>Master Mode</h4>
    <div class="mode">
      <span>Max Task Numbers: </span><input type="number" min="1" max="100" bind:value={$configCont.number} />
    </div>
    <div class="mode">
      <span>Auto Forgotten Days:</span><input type="number" min="1" max="365" bind:value={$configCont.day} />
    </div>
    <div class="save_btn" on:click={handleNumberSave}>Save</div>
  </div>
  <hr>
  <div class="base_wrap">
    <h4>Export</h4>
    <!-- <p>New publish version will update !</p> -->
    <div class="mode">
      <span>GitHub issues url:</span><input type="text" />
    </div>
    <div class="mode">
      <span>Token:</span><input type="text" /> 
    </div>
    <div class="save_btn">Save</div>
  </div>

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
		background: rgba(0,0,0,0.6);
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

  .base_wrap{
    overflow: hidden;
    padding: 0 10px;
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
    background: #000;
    border-top-right-radius: 5px;
    line-height: 20px;
    color: #fff;
  }
  .close:hover{
    background: #d84040;
  }

  
  .save_btn{
    transition: all ease-in 0.3s;
    color: #666;
    border-radius: 4px;
    font: inherit;
    line-height: 18px;
    padding: 6px 12px;
    cursor: pointer;
    background: #000;
    color: #fff;
    float: right;
    margin-right: 5px;
    margin-bottom: 10px;
  }
  .save_btn:hover{
    background: #d84040;
  }

</style>