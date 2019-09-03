<script>
  import { selectTab } from './stores.js';

  // 配置信息
  const list = [
    { id: 0, name: 'Todo' },
    { id: 1, name: 'Done' },
    { id: 2, name: 'Draft' },
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

<p>{$selectTab}</p>
<ul>
	{#each list as {id, name}}
		<li key={id} on:click={handler.changeSelect(id)}>{name} </li>
	{/each}
</ul>


<style>
  ul{
    list-style: none;
    overflow: hidden;
  }
  li{
    float:left;
    height:30px;
    line-height: 30px;
    padding: 0 20px;
    cursor: pointer;
  }
  li + li{
    border-left: 1px solid rgb(224, 224, 224);
  }
</style>