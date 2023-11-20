<!-- 
    Basic labeled toggle
-->

<script>
    // Expose variables:
    export let label = "";
    export let val;
</script>

<div class="functional_ui fui_toggle_container">
    <input type="checkbox" bind:checked={val}>
    <p>{label}</p>
</div>


<style>
    .fui_toggle_container{
        display: flex;
        gap: 0.5em;
        align-items: center;
    }
</style>