<!-- 
    An item in the FileExplorer file list.
    TODO: Resolve A11y error. Possibly change to an a element?
-->

<script>
    // Import dependencies:
    import { createEventDispatcher } from 'svelte';

    // Import components:
    import ExpandButton from '$lib/components/ui/workspace/file-explorer/ExpandButton.svelte';
    
    // Expose variables:
    export let file_list = {};
    export let indent = 0;

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
                <svelte:self file_list={val.files} indent={indent + 15} on:select_file = {(e) => select_file_pass(e)}/>
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