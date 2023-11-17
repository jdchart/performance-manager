<!-- 
    A file system-inspired expand button.
-->

<script>
    // Import dependencies:
    import { createEventDispatcher } from 'svelte';

    // Expose variables:
    export let state = true;
    
    // Create event dispatcher:
    const dispatch = createEventDispatcher();

    function handle_click(){
        /* Toggle the state between true and false. */
        if(state){state = false;}
        else{state = true;};

        // Dispatch state change event:
        dispatch("update_file_list");
    };
</script>

<button on:click={() => handle_click()}>
    {#if state}▼{:else}▶{/if}
</button>

<style>
    button{
        background-color: transparent;
        border: none;
        font-size: 0.8em;
        height: 100%;
        border-radius: 3px;
    }

    button:hover{
        background-color: rgba(85, 85, 85, 0.8);
        cursor: pointer;
    }
</style>