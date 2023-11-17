<!-- 
    Populates the record list in the RecordExplorer.
    TODO: Resolve A11y error. Possibly change to an a element?
-->

<script>
    // Import dependencies:
    import { createEventDispatcher } from 'svelte';

    // Expose variables:
    export let record_data;

    // Create event dispatcher:
    const dispatch = createEventDispatcher();

    function handle_select(){
        /* Dispatch record selected event. */

        dispatch("select_record", {record_data : record_data});
    };
</script>

<li on:click={() => handle_select()} class="{record_data.selected ? 'list_element_selected' : ''} list_element_hover">
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
</style>