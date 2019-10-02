<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  
  import { sortMode, sortOrder} from './stores.js';
  import * as control from './controller/index.js';

  let visible = false;
  let inputVal, textVal;

  onMount(async () => {
    // 需要一个处理disable逻辑
  })

  const method = {
    handleNewList: async () => {
      const todoCount = await control.countStore('taskDB');
      const maxCount = await control.countConfig();

      if(todoCount >= maxCount) {
        alert('Please Hurry up to finish your task in hand!')
      }

      if(inputVal !== undefined && inputVal.trim().length > 0) {
        const text = (textVal === undefined || textVal.trim().length === 0) ? '暂无任务描述信息' : textVal
        control.addStore('taskDB', {time: new Date().getTime(), title: inputVal, desc: text, progress: 0, pin: false}, $sortMode, $sortOrder)
        
        visible = false;
      } else {
        alert('Please input task name!')
      }
    },

    handleFocus: () => {
      visible = true;
    },
    
    handleDescHide: () => {
      visible = false;
    }
  }
</script>


<div id="add">
  {#if visible}
    <div id="addDesc" in:fly="{{ y: 400, duration: 1000 }}" out:fade>
      <textarea name="" id="" cols="30" rows="10" placeholder="新建事项描述(可选)" bind:value={textVal}></textarea>
      <span id='descClose' on:click={method.handleDescHide}> × </span>
    </div>
  {/if}

  <input id="addTitle" on:click={method.handleFocus} placeholder="新建事项" bind:value={inputVal} />
  <div id='addBtn' on:click={ method.handleNewList }>添加</div>
</div>


<style>
  #add {
    position: absolute;
    bottom: 10px;
    width: 370px;
    padding: 0 10px;
  }
  #addDesc {
    position: absolute;
    bottom: 36px;
  }
  #addDesc textarea {
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 370px;
    box-sizing: border-box;
    padding: 10px;
    height: 50px;
    resize:none;
  }
  #descClose{
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
  #descClose:hover{
    background: #d84040;
  }
  #addTitle {
    height: 34px;
    padding: 6px 12px;
    font-size: 12px;
    line-height: 1.42857143;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 307px;
  }
  #addBtn {
    transition: all ease-in 0.3s;
    box-sizing: border-box;
    height: 34px;
    line-height: 22px;
    border: 1px solid #ccc;
    padding: 6px 15px;
    border-radius: 5px;
    float: right;
    cursor: pointer;
  }
  #addBtn:hover{
    background:#d84040;
    color: #fff;
  }

</style>