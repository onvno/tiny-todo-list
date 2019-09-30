<script>
  import { fly } from 'svelte/transition';
  
  import * as control from './controller/index.js';

  let visible = false;
  let inputVal, textVal;

  const focusFunc = () => {
    
  }

  const method = {
    handleNewList: () => {
      control.addStore('taskDB', {time: new Date().getTime(), title: inputVal, desc: textVal, progress: '0'})
    },
    handleFocus: () => {
      visible = !visible
    }
  }
</script>


<div id="add">
  {#if visible}
    <div id="addDesc" transition:fly="{{ y: 400, duration: 1000 }}">
      <textarea name="" id="" cols="30" rows="10" placeholder="新建事项描述(可选)" bind:value={textVal}></textarea>
    </div>
  {/if}

  <input id="addTitle" on:click={method.handleFocus} placeholder="新建事项" bind:value={inputVal} />
  <div id='addBtn' on:click={ method.handleNewList }>添加</div>
</div>




<style>
  #add {
    position: absolute;
    bottom: 10px;
    width: 390px;
  }
  #addDesc {
    position: absolute;
    bottom: 36px;
  }
  #addDesc textarea {
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 390px;
    box-sizing: border-box;
    padding: 10px;
    height: 50px;
    resize:none;
  }
  #addTitle {
    height: 34px;
    padding: 6px 12px;
    font-size: 12px;
    line-height: 1.42857143;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 327px;
  }
  #addBtn {
    box-sizing: border-box;
    height: 34px;
    line-height: 22px;
    border: 1px solid #ccc;
    padding: 6px 15px;
    border-radius: 5px;
    float: right;
    cursor: pointer;
  }

</style>