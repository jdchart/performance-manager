<!-- 
    The main file explorer component.
-->

<script>
    // Import dependencies:
    import * as utils from "$lib/scripts/utils.js";
    import { createEventDispatcher } from 'svelte';

    // Create event dispatcher:
    const dispatch = createEventDispatcher();

    // Import components
    import File from '$lib/components/ui/workspace/file-explorer/File.svelte';
    import FileInfo from '$lib/components/ui/workspace/file-explorer/FileInfo.svelte';

    // Expose variables
    export let file_list = {};
    export let selected_file;
    export let record_data = {};
    export let ontology_data;

    export const trigger_update = () => {
        selected_file = selected_file;
    }

    function select_file(e){
        /* Select a single file */

        // Set all files to selected === false:
        utils.set_val_recursive("selected", false, file_list);
        
        // Set the incoming event's selected value to true:
        e.detail.selected["selected"] = true;
        
        // Update selected file to incoming event:
        selected_file = e.detail.selected;
        
        // Trigger component update:
        file_list = file_list;

        /// this fucks everything....
        //dispatch("update_selected_file", {selected_file_id: e.detail.selected.id})
    };
</script>

<div class="file_explorer_container">
    <!-- File list pane: -->
    <ul>
        <File
            file_list = {file_list}
            on:select_file = {(e) => select_file(e)}
            ontology_data = {ontology_data}
            record_list = {record_data}
        />
    </ul>
    
    <!-- File info pane: -->
    <div class="file_info_wrapper">
        <FileInfo
            selected_file = {selected_file}
            record_data = {record_data}
        />
    </div>
</div>

<style>
    .file_explorer_container{
        display: flex;
        width: 100%;
        height: 70vh;
        gap: 0.5em;
        border: 1px solid #acacac;
        border-radius: 5px;
    }

    ul{
        padding: 0.2em;
        overflow: scroll;
        height: 100%;
        width: 60%;
        border-right: 1px solid #acacac;
        background-color: rgb(243, 243, 243);
        border-radius: 5px 0 0 5px;
    }

    .file_info_wrapper{
        width: 40%;
        padding: 0.2em;
    }
</style>