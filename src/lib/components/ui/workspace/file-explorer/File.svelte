<script>
    import ExpandButton from '$lib/components/ui/workspace/file-explorer/ExpandButton.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let file_list = {};
    export let indent = 0;

    function handle_update_file_list(e){
        file_list = file_list;
    };

    function handle_file_select(entry){
        dispatch("select_file", {selected : entry});
    };

    function select_file_pass(e){
        dispatch("select_file", {selected : e.detail.selected});
    };
</script>

<div style="margin-left: {indent}px">
    {#each Object.entries(file_list) as [key, val]}
        {#if Object.keys(val).includes("name")}
            <li class="file_li">
                <div class="file_inner_container {val.selected ? 'selected_file' : ''}" on:click={() => handle_file_select(val)}>
                    <img src="images/file-icon.png" alt="file icon" class="folder_explorer_icon">
                    <p>{val.name}</p>
                </div>
            </li>
        {:else}
            <li>
                <div class="file_inner_container">
                    <img src="images/folder-icon.png" alt="folder icon" class="folder_explorer_icon">
                    <p>{key}</p>
                    <ExpandButton 
                        bind:state = {val["expanded"]}
                        on:update_file_list={(e) => handle_update_file_list(e)}
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
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        height: 100%;
        gap: 0.5em;
    }

    .folder_explorer_icon{
        height: 1.5em;
    }

    .file_li:hover{
        background-color: rgba(85, 85, 85, 0.8);
        cursor: pointer;
        border-radius: 3px;
    }

    .selected_file{
        border: 1px solid #acacac;
        background-color: rgba(195, 195, 195, 0.8);
    }
</style>