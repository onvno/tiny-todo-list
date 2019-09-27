<script>
  import { fly } from 'svelte/transition';

  let visible = true;

  const focusFunc = () => {
    visible = !visible
  }
</script>


{#if visible}
  <div id="taskTest" transition:fly="{{ y: 200, duration: 2000 }}">
    <textarea name="" id="" cols="30" rows="10" placeholder="Please Input Desc (Option)"></textarea>
  </div>
{/if}

<input on:focus={focusFunc} placeholder="Add Your Temp Task" />
<div>Add</div>



<style>
  .show{
    display: block;
  }
  .hide{
    display: none;
  }

  #taskTest {
    position: absolute;
    top: 195px;
  }
</style>