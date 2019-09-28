<script>
  import { createEventDispatcher } from 'svelte';

  export let percent;
  let element
	const dispatch = createEventDispatcher();

	function handlePercent(percent) {
		dispatch('percent', {
			text: percent
		});
	}

  function handleMousedown(event) {
    document.onmousemove = function(e) {
      const left = e.clientX / 380;
      const percent = left * 100 + '%';
      element.style.left = percent;

      // 此处加个防抖
      handlePercent(percent)

      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
  }

  document.onmouseup = function(event){
    document.onmousemove = null;
  }

</script>

<div class="progress">
    <div class="line"></div>
    <span class="controller" bind:this={element} on:mousedown={handleMousedown} style='left:{`${percent}%`}'></span>
</div>

<style>
.progress{
    position: absolute;
    /* top: 518px; */
    bottom:-5px;
    width:100%;
    height:11px;
    background-color: rgba(0,0,0,0);
    box-shadow: none;
}
.progress .line{
    position: absolute;
    top: 5px;
    height:1px;
    width:0%;
    background-color: #27ae60;
}
.progress .controller{
    cursor: pointer;
    display: block;
    clear: both;
    width: 5px;
    height: 5px;
    background: #27ae60;
    position: absolute;
    left: 0%;
    margin-left: 0px;
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 0 2px rgb(163, 163, 163);
}
</style>


