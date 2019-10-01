<script>
  import { selectTab } from './stores.js';
  import { tabMapDB } from './config/constant.js';
  import * as control from './controller/index.js';

  // 配置信息
  const list = [
    { category: "todo", name: '进行中' },
    { category: "complete", name: '已完成' },
    { category: "pending", name: '回收站' },
  ]


  // 事件
  const handler = {
    changeSelect: function(category) {
      return async () => {
        await control.searchStore(tabMapDB[category])
        selectTab.update(() => category)
      }
    }
  }
</script>


<!-- <h1>Tiny - Todo - List</h1> -->

<!-- <p>{$selectTab}</p> -->
<ul>
	{#each list as {category, name}}
		<li key={category} on:click={handler.changeSelect(category)} class="{$selectTab === category ? 'active' : ''}">
      <i>{name}</i>
    </li>
	{/each}
</ul>


<style>
  ul{
    position: relative;
    /* height:32px; */
    margin-bottom: 0px;
    padding-left: 0;
    list-style: none;
    border-bottom: 1px solid rgb(224, 224, 224);
    height: 31px;
  }
  ul::before {
    display: table;
    content: " ";
  }

  ul::after {
    content: " ";
    clear: both;
  }

  li{
    position: relative;
    margin-bottom: -1px;
    float:left;
    border: 1px solid #fff;
    border-bottom-color: rgb(224, 224, 224);
  }
  li.active{
    border: 1px solid rgb(224, 224, 224);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-color: #fff;
  }
  li i {
    height:30px;
    line-height: 30px;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    display: block;
    font-style: normal;
  }
</style>