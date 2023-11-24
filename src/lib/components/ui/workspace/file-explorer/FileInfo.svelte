<!-- 
    Display file info for the selected file.
    TODO: Do this with iteration.
-->

<script>
    // Import components:
    import TextFieldLabel from '$lib/components/ui/workspace/file-explorer/TextFieldLabel.svelte';

    // Expose variables
    export let selected_file = {};

    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    import { lang } from '$lib/scripts/project_data.js';
</script>

<div class="file_info_container">
    {#if Object.keys(selected_file).length === 0}
        <p class="choose_file_message">({language.get_term(["file_explorer", "select_a_file_message"], $lang)}...)</p>
    {:else}
        <div>
            <TextFieldLabel
                label = {language.get_term(["file_explorer", "name"], $lang)}
                value = {selected_file.name}
            />
        </div>
        <div>
            <TextFieldLabel
                label = {language.get_term(["file_explorer", "path"], $lang)}
                value = {selected_file.path}
            />
        </div>
        <div>
            <TextFieldLabel
                label = {language.get_term(["file_explorer", "extension"], $lang)}
                value = {selected_file.extension}
            />
        </div>
        <div>
            <TextFieldLabel
                label = {language.get_term(["file_explorer", "type"], $lang)}
                value = {selected_file.type}
            />
        </div>
        <div>
            <TextFieldLabel
                label = {language.get_term(["file_explorer", "size"], $lang)}
                value = {"≃ " + String(Math.floor(selected_file.size / 1048576)) + " Mo"}  
            />
        </div>
        <div>
            <TextFieldLabel
                label = {language.get_term(["file_explorer", "last_modified"], $lang)}
                value = {new Date(selected_file.last_modified)}
            />
        </div>
    {/if}
</div>

<style>
    .choose_file_message{
        font-style: italic;
        text-align: center;
        padding-top: 2em;
    }

    .file_info_container{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }

    .file_info_container > * {
        padding-bottom: 1em;
    }
</style>