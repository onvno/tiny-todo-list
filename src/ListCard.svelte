<script>
  import { listCont } from './stores.js';
  import Progress from './Progress.svelte';

  const handlePercent = (event) => {
    console.log("event.detail:", event.detail);

    // 此处更新listCont
  }
</script>

<ul>
	{#each $listCont as {title, desc, progress}}
		<li>
      <h4>{@html title}</h4>
      <p>{@html desc}</p>
      <Progress percent={progress} on:percent={handlePercent} />
    </li>
	{/each}
</ul>

<style>
  li{
    position: relative;
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