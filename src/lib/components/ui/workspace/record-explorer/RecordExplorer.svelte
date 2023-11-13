<script>
    import RecordPreview from '$lib/components/ui/workspace/record-explorer/RecordPreview.svelte';
    export let record_list = {"records":{}};
    export let ontology_data;
    export let selected_record;

    function handle_print_list(){
        console.log(record_list)
    }
</script>

<div class="record_explorer_container">
    <p>record explorer</p>
    <button on:click={() => handle_print_list()}>print record list</button>
    <ul>
        {#each Object.entries(record_list["records"]) as [class_key, inner_record_list]}
            <p>{class_key}</p>
            <!-- {#each record_list as record}
                <RecordPreview 
                    record_data = {record}
                />
            {/each} -->
        {/each}
    </ul>
</div>