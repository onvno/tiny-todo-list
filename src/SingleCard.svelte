<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';

  import Progress from './Progress.svelte';
  import { fade } from 'svelte/transition';

  import * as control from './controller/index.js';

  export let title
  export let desc
  export let progress
  export let id

  let titleDOM, cardDOM;
  let visible = false;
  let editable = false;
  let enter = false;

  const handlePercent = (event) => {
    console.log("event.detail:", event.detail);
    // 此处更新listCont
  }

  const handleShowDesc = () => {
    visible = !visible;
  }

  const handleDoubleClick = (event) => {
    editable = !editable;
  }

  const handleDelete = () => {
    control.deleteStore('taskDB', id)
  }

  onMount(() => {
    if (document.activeElement !== titleDOM) {
      editable = false;
    }

    cardDOM.addEventListener('mousemove', () => {
      enter = true;
    })
    cardDOM.addEventListener('mouseout', () => {
      enter = false;
    })

  })

  afterUpdate(() => {
    // 注释部分为可选择所有代码
    // var range = document.createRange();
    // range.selectNodeContents(titleDOM);
    // window.getSelection().removeAllRanges();
    // window.getSelection().addRange(range);

    titleDOM.focus();
  })




</script>

<li bind:this={cardDOM} style='opacity:{ 0.6 + progress / 200}'>
  <h4 bind:this={titleDOM} on:dblclick={handleDoubleClick} contenteditable="{editable}">{@html title}</h4>
  <span class="icon icon_down" on:click={handleShowDesc}>
    <svg t="1569662770324" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8097" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/css"></style></defs><path d="M690 405h-46.9c-10.2 0-19.9 4.9-25.9 13.2L512 563.6 406.8 418.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246c3.2 4.4 9.7 4.4 12.9 0l178-246c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="8098" fill="#cdcdcd"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="8099" fill="#cdcdcd"></path></svg>
  </span>
  <span class="icon icon_del" on:click={handleDelete}>
    <svg t="1569662831978" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8461" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/css"></style></defs><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z" p-id="8462" fill="#cdcdcd"></path><path d="M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" p-id="8463" fill="#cdcdcd"></path></svg>
  </span>
  <!-- <i>完成度：40</i> -->
  {#if visible}
	  <p transition:fade>{@html desc}</p>
  {/if}
  <Progress enter={enter} percent={progress} on:percent={handlePercent} />
</li>

<style>
  li{
    position: relative;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  h4{
    font-style: normal;
    padding: 6px 0 10px;
    font-size: 14px;
  }

  i{
    cursor: pointer;
    display: inline-block;
    padding: 4px 0 10px;
  }

	[contenteditable="true"] {
		padding: 0.5em;
		border: 1px solid #eee;
		border-radius: 4px;
  }
  
  .icon{
    cursor: pointer;
  }

  span.icon {
    cursor: pointer;
    position: absolute;
    display: none;
    right: 1rem;
    top: 0.5rem;
  }

  span.icon.icon_down {
    transition: right 0.4s ease;
    cursor: pointer;
    position: absolute;
    display:block;
    right: 1rem;
    opacity: 0;
  }

  span.icon.icon_del {
    transition: right 0.6s ease;
    cursor: pointer;
    position: absolute;
    display:block;
    right: 1rem;
    opacity: 0;
  }

  li:hover span{
    display: block;
  }
  li:hover span.icon_down{
    right: 1.5rem;
    opacity: 1;
  }
  li:hover span.icon_del{
    right: 4rem;
    opacity: 1;
  }

</style>