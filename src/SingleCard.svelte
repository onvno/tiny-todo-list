<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';

  import { fade } from 'svelte/transition';

  import * as control from './controller/index.js';
  import { handleTabPercent, handleTabDelete, handleTabPin } from './config/index.js';
  import { sortMode, sortOrder } from './store/index.js';

  export let title
  export let desc
  export let progress
  export let id
  export let time
  export let DBName
  export let pin
  export let key

  let titleDOM, cardDOM, progressDOM, descDOM;
  let visible = false;
  let editable = false;
  let descEditable = false;


  const handlePercent = (percent) => {
    handleTabPercent(DBName, {title, desc, progress: percent, id, pin, time: new Date().getTime()}, $sortMode, $sortOrder)
  }

  const handleDelete = () => {
    handleTabDelete(DBName, {title, desc, progress, id, pin, time: new Date().getTime()}, $sortMode, $sortOrder)
  }

  const handlePin = () => {
    handleTabPin(DBName, {title, desc, progress, id, time: new Date().getTime(), pin: !pin}, $sortMode, $sortOrder)
  }

  const handleShowDesc = () => {
    visible = !visible;
  }

  const handleDoubleClick = (position) => {
    return ( e ) => {
      if( position === 'title' && !editable ) {
        editable = true

      } else if ( position === 'desc' && !descEditable ) {
        descEditable = true
      }
    }
  }



  const handleBlur = (position) => {
    return (e) => {

      if( position === 'title' ) {
        const titleCont = titleDOM.innerHTML;
        control.updateStore(DBName, id, {title: titleCont, time: new Date().getTime()}, $sortMode, $sortOrder)
        
        editable = false;
      } else if ( position === 'desc') {
        const descCont = descDOM.innerHTML;
        control.updateStore(DBName, id, {desc: descCont, time: new Date().getTime()}, $sortMode, $sortOrder)

        descEditable = false
      }
    }
  }

  onMount(() => {})

  afterUpdate(() => {
    // 注释部分为可选择所有代码
    // var range = document.createRange();
    // range.selectNodeContents(titleDOM);
    // window.getSelection().removeAllRanges();
    // window.getSelection().addRange(range);

    // titleDOM.blur();
    // descDOM.blur();
  })

  // progress
  function handleMousedown(event) {
    document.onmousemove = function(e) {

      // 处理清除DOM时，仍要添加style的报错
      if(progressDOM) {
        let left;

        if( (e.clientX - 380) > 0) {
          left = 1
        } else if (e.clientX < 10) {
          left = 0
        } else {
          left =  (e.clientX - 5) / 370 // 本应该-10的边距，修正下svg的距离问题
        }
       
        const percent = left * 100 + '%';
        progressDOM.style.left = percent;

        handlePercent(left * 100)
      }

      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
  }

  document.onmouseup = function(event){
    document.onmousemove = null;
  }




</script>

<!-- {@debug progress} -->
<li bind:this={cardDOM}
  style='{ (DBName == 'taskDB' && progress >= 67) ? "color: #999; font-weight: 100;" :  (DBName == 'taskDB' && progress >= 33) ? "color: #999;" : "color: #333;" } {(pin && DBName == 'taskDB') ? "background: rgb(247,247,247)" : ""}'
>
  <h4
    style='{ (DBName == 'taskDB' && progress >= 67) ? "font-weight: 100;" : ""}'
    contenteditable="{editable}"
    bind:this={titleDOM}
    on:dblclick={handleDoubleClick('title')}
    on:blur={handleBlur('title')}
  >
    {@html title}
  </h4>

  <span class="icon icon_down" on:click={handleShowDesc}>
    <svg style='display:{visible ? "none" : "inline"}' t="1569662770324" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8097" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/css"></style></defs><path d="M690 405h-46.9c-10.2 0-19.9 4.9-25.9 13.2L512 563.6 406.8 418.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246c3.2 4.4 9.7 4.4 12.9 0l178-246c3.9-5.3 0.1-12.7-6.4-12.7z" p-id="8098" fill="#cdcdcd"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="8099" fill="#cdcdcd"></path></svg>
    <svg style='display:{visible ? "inline" : "none"}' t="1569662814437" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8279" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/css"></style></defs><path d="M518.5 360.3c-3.2-4.4-9.7-4.4-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z" p-id="8280" fill="#cdcdcd"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" p-id="8281" fill="#cdcdcd"></path></svg>
  </span>

  <span class="icon icon_pin" on:click={handlePin}>
    <svg t="1569940821561" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7963" width="20" height="20" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355c-3.2-4.1-9.4-4.1-12.6 0l-112 141.7c-4.1 5.2-0.4 12.9 6.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z" p-id="7964" fill="#cdcdcd"></path></svg>
  </span>

  <span class="icon icon_del" on:click={handleDelete}>
    <svg t="1569662831978" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8461" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/css"></style></defs><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z" p-id="8462" fill="#cdcdcd"></path><path d="M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" p-id="8463" fill="#cdcdcd"></path></svg>
  </span>

  <!-- <i>完成度：40</i> -->
  {#if visible}
	  <p 
      transition:fade
      on:dblclick={handleDoubleClick('desc')}
      on:blur={handleBlur('desc')}
      contenteditable="{descEditable}"
      bind:this={descDOM}
    >
      {@html desc}
    </p>
  {/if}

  <div class="progress">
    <div class="line" style='width:{`${progress}%`}'></div>
    <span
      class="controller"
      bind:this={progressDOM} 
      on:mousedown={handleMousedown}
      style='left:{`${(370-10) * progress / 100}px`}'>
      <svg t="1569942433887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12163" width="15" height="15" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M323.368421 148.210526h377.263158a53.894737 53.894737 0 0 1 53.894737 53.894737v350.31579l-242.526316 215.578947-242.526316-215.578947V202.105263a53.894737 53.894737 0 0 1 53.894737-53.894737z" fill="#cdcdcd" p-id="12164"></path></svg>
    </span>
  </div>
</li>

<style>
  li{
    position: relative;
    display: block;
    padding: 0 10px;
  }

  h4{
    font-style: normal;
    padding: 10px 0;
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

  span.icon.icon_pin {
    transition: right 0.5s ease;
    cursor: pointer;
    position: absolute;
    display:block;
    right: 1rem;
    opacity: 0;  
    top: 0.6rem; 
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
  li:hover span.icon_pin{
    right: 4rem;
    opacity: 1;
  }
  li:hover span.icon_del{
    right: 6.5rem;
    opacity: 1;
  }
  li:hover .progress{
    display:block;
  }

  p{
    padding-bottom: 15px;
  }

  .progress{
    /* display:none; */
    position: absolute;
    /* top: 518px; */
    bottom: 0px;
    width: 370px;
    height:11px;
    background-color: rgba(0,0,0,0);
    box-shadow: none;
    border-bottom: 1px solid #eee;
  }
  .progress .line{
    position: absolute;
    top: 11px;
    height:1px;
    width:0%;
  }
  .progress .controller{
    position: absolute;
    top: 1px;
    cursor: pointer;
    display: none;
    clear: both;
    /* width: 5px; */
    /* height: 5px; */
    /* background: #27ae60; */
    left: 0%;
    margin-left: 0px;
    /* border-radius: 50%; */
    /* border: 3px solid #fff; */
    /* box-shadow: 0 0 2px rgb(163, 163, 163); */
  }

  li:hover .controller path,li:hover svg:hover path {
    /* fill: #27ae60; */
    fill: #f77c41;
  }
  li:hover .line{
    background-color: #f77c41;
  }
  li:hover .progress .controller{
    display: block;
  }

/* #f77c41 */
</style>