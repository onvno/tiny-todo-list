<script>
  import { listCont } from './stores.js';



</script>

<ul>
	{#each $listCont as {title, desc}}
		<li>
      <h4>{@html title}</h4>
      <p>{@html desc}</p>
    </li>
	{/each}
</ul>

<style>
  li{
    display: block;
    width:100%;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  h4{
    font-style: normal;
  }

  p{
    display:none;
  }

</style>