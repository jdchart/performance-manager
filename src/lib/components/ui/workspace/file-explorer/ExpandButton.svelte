<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let state = true;

    function handle_click(){
        if(state){
            state = false;
        }else{
            state = true;
        };
        dispatch("update_file_list");
    };
</script>

<button on:click={() => handle_click()}>
    {#if state}
        ▼
    {:else}
        ▶
    {/if}
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