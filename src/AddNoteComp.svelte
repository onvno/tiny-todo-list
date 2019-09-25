<div id="taskTest" class={focusState ? "show" : "hide"}>
  <textarea name="" id="" cols="30" rows="10" placeholder="Please Input Desc (Option)"></textarea>
</div>
<input on:focus={focusFunc} placeholder="Add Your Temp Task" />
<div>Add</div>

<script>
  let focusState = false;

  const focusFunc = () => {
    focusState = true
  }
</script>

<style>
  .show{
    display: block;
  }
  .hide{
    display: none;
  }
</style>