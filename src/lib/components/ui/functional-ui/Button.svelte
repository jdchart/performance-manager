<!-- 
    Basic button
-->


<script>
    // Expose variables:
    export let label = "";
    export let func;
</script>

<button class="functional_ui" on:click={() => func()}>{label}</button>