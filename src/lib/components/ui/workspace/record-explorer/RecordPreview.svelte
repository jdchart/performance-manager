<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher();

    export let record_data;
    export let current_language;

    function handle_select(record_id){
        dispatch("select_record", {record_data : record_data});
    };
</script>

<li on:click={() => handle_select(record_data.record_unique_id)} class={record_data.selected ? 'selected_record' : ''}>
    <p>
        {#if record_data.attributes[0].value === ""}
            {record_data.record_unique_id}
        {:else}
            {record_data.attributes[0].value}
        {/if}
    </p>
</li>

<style>
    li{
        padding: 0.1em;
    }
    li:hover{
        background-color: rgba(85, 85, 85, 0.8);
        cursor: pointer;
        border-radius: 3px;
    }

    .selected_record{
        border: 1px solid #acacac;
        background-color: rgba(195, 195, 195, 0.8);
    }
</style>