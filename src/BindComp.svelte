<div>
  <p bind:this={element}  on:mousedown={downFunc}>111111111111</p>
  <p>222222222222</p>
  <p>222222222222</p>
</div>

<script>
  import {onMount, onDestroy, getContext} from 'svelte';
  
  let element

  function downFunc(event){
    console.log("mouseDown")

    document.onmousemove = function(e) {
      console.log(e.clientX)
    }
  }

  function moveFunc(event) {
    console.log("move:", event.clientX)
  }

  onMount(() => {
    console.log('the component has mounted');
    console.log("element:", element);
    
    // element.addEventListener('click', function(){
    //   console.log('click!!!');
    // })

    document.onmouseup = function(event){
      document.onmousemove = null;
    }

  });
  

</script>