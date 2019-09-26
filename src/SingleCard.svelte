<script>
  import Progress from './Progress.svelte';
  import { fade } from 'svelte/transition';

  export let title
  export let desc
  export let progress

  let visible = false;

  const handlePercent = (event) => {
    console.log("event.detail:", event.detail);
    // 此处更新listCont
  }

  const handleShowDesc = () => {
    visible = !visible;
  }
</script>

<li style='opacity:{progress / 100}'>
  <h4>{@html title}</h4><i on:click={handleShowDesc}>展开</i>
  {#if visible}
	  <p transition:fade>{@html desc}</p>
  {/if}
  <Progress percent={progress} on:percent={handlePercent} />
</li>

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

  i{
    cursor: pointer;
  }

</style>