<!-- 
    An item in the FileExplorer file list.
    TODO: Resolve A11y error. Possibly change to an a element?
-->

<script>
    // Import dependencies:
    import { createEventDispatcher } from 'svelte';

    // Import components:
    import ExpandButton from '$lib/components/ui/workspace/file-explorer/ExpandButton.svelte';
    import RecordColor from '$lib/components/ui/workspace/record-explorer/RecordColor.svelte';
    
    // Expose variables:
    export let file_list = {};
    export let indent = 0;
    export let ontology_data;
    export let record_list;

    // Create event dispatcher
    const dispatch = createEventDispatcher();

    function handle_update_file_list(){
        /* Trigger component update when expand button is clicked. */
        file_list = file_list;
    };

    function handle_file_select(entry){
        /* Dispatch an event with the selected file. */
        dispatch("select_file", {selected : entry});
    };

    function select_file_pass(e){
        /* Same as handle_selected_file but accepts event from child File component. */
        dispatch("select_file", {selected : e.detail.selected});
    };

    function find_class_from_id(id){
        /* 
        Return ontology class data from it's unique ID.
        TODO: consolidate this with find_class_type_from_id (only the ontology_data key changes)
        */

        for(let class_entry of ontology_data["classes"]){
            if(class_entry["unique_id"] === id){
                return class_entry;
            };
        };
    };

    function find_class_type_from_id(id){
        /* 
        Return ontology class type from it's unique ID.
        TODO: consolidate this with find_class_from_id (only the ontology_data key changes)
        */

        for(let class_entry of ontology_data["class_types"]){
            if(class_entry["unique_id"] === id){
                return class_entry;
            };
        };
    };

    function get_record_from_id(data, id){
        // Return record data from record list with id.
        for(let record_type of Object.keys(data["records"])){
            for(let record of data["records"][record_type]["records"]){
                if(record["record_unique_id"] === id){
                    return record;
                };
            };
        };
    };

    function get_col(record_id){
        let rec_data = get_record_from_id(record_list, record_id)
        let class_id = rec_data["unique_id"]        
        return find_class_type_from_id(find_class_from_id(class_id)["type"])["color"]
    }
</script>

<!-- Each entry will have an indent: -->
<div style="margin-left: {indent}px">
    <!-- Go through each item in the file list: -->
    {#each Object.entries(file_list) as [key, val]}

        <!-- File items: -->
        {#if Object.keys(val).includes("name")}
            <li class="list_element_hover">
                <div class="file_inner_container general_flex_wrap {val.selected ? 'list_element_selected' : ''}" on:click={() => handle_file_select(val)}>
                    <img src="images/file-icon.png" alt="file icon" class="folder_explorer_icon">
                    <p>{val.name}</p>
                    {#if val.associated_record != ""}
                        <RecordColor
                            col = {get_col(val.associated_record)}
                        />
                    {/if}
                </div>
            </li>
        
        <!-- Folder items: -->
        {:else}
            <li>
                <div class="file_inner_container general_flex_wrap">
                    <img src="images/folder-icon.png" alt="folder icon" class="folder_explorer_icon">
                    <p>{key}</p>
                    <ExpandButton 
                        bind:state = {val["expanded"]}
                        on:update_file_list={() => handle_update_file_list()}
                    />
                </div>
            </li>
            {#if val["expanded"]}
                <svelte:self 
                file_list={val.files} 
                indent={indent + 15} 
                on:select_file = {(e) => select_file_pass(e)} 
                ontology_data = {ontology_data}
                record_list = {record_list}
                />
            {/if}
        {/if}
    {/each}
</div>

<style>
    .file_inner_container{
        gap: 0.5em;
    }

    .folder_explorer_icon{
        height: 1.5em;
    }
</style>