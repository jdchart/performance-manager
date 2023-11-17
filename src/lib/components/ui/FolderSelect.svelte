<!-- 
    A button that opens a file explorer for selecting a folder.
    TODO: Handle cancel
-->

<script>
    // Import dependencies
    import * as file_system from "$lib/scripts/file_system.js";
    import { createEventDispatcher } from 'svelte';

    // Import components
    import GeneralButton from "$lib/components/ui/GeneralButton.svelte";

    // Expose variables:
    export let label = "Select Folder";

    // Create event dispatcher:
    const dispatch = createEventDispatcher();

    async function get_files(){
        /* 
        Open a file explorer looking for a folder. Return list of all files in folder. 
        TODO: Add cancel handle here.
        */
        
        // Get files:
        let [file_list, direc] = await file_system.get_files();
        
        // Parse files:
        let parsed = await file_system.file_list_parse(file_list);
        
        // Dispatch file event:
        dispatch("recieve_file_parse", {file_parse : parsed, root_directory : direc.name});
    }
</script>

<GeneralButton
    label = {label}
    func = {() => get_files()}
/>