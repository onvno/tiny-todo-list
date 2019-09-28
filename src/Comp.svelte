<script>
  import { selectTab } from './stores.js';

  // 配置信息
  const list = [
    { id: 0, name: '进行中' },
    { id: 1, name: '已完成' },
    { id: 2, name: '回收站' },
  ]


  // 事件
  const handler = {
    changeSelect: function(num) {
      return () => {
        selectTab.update(() => num)
      }
    }
  }
</script>


<!-- <h1>Tiny - Todo - List</h1> -->

<!-- <p>{$selectTab}</p> -->
<ul>
	{#each list as {id, name}}
		<li key={id} on:click={handler.changeSelect(id)} class="{$selectTab === id ? 'active' : ''}">
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