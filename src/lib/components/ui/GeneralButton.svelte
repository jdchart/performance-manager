<!-- 
    Basic button component.
-->

<script>
    // Expose variables:
    export let label = "";
    export let func;
</script>

<button class="general_button" on:click={() => func()}>{label}</button>

<style>
    .general_button{
        background-color: rgba(85, 146, 153, 0.9);
        border: 1px solid #acacac;
        color: #2b2b2b;
        padding: 0.3em;
        border-radius: 5px;
    }

    .general_button:hover{
        cursor: pointer;
        background-color: rgba(108, 177, 185, 0.9);
        transition-duration: 200ms;
    }
</style>