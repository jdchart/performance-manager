<script>
    import * as file_system from "$lib/scripts/file_system.js";
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let label = "Select Folder";

    async function get_files(){
        let [file_list, direc] = await file_system.get_files();
        let parsed = await file_system.file_list_parse(file_list);
        dispatch("recieve_file_parse", {file_parse : parsed, root_directory : direc.name});
    }
</script>

<button on:click={() => get_files()} class="general_button">{label}</button>