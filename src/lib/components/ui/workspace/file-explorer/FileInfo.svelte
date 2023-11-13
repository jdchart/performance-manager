<script>
    import TextFieldLabel from '$lib/components/ui/workspace/file-explorer/TextFieldLabel.svelte';

    export let selected_file = {};

    // Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';
</script>

<div class="file_info_container">
    {#if Object.keys(selected_file).length === 0}
        <p class="choose_file_message">({page_vocab.file_explorer.select_a_file_message[current_language]}...)</p>
    {:else}
        <div>
            <TextFieldLabel
                label = {page_vocab.file_explorer.name[current_language]}
                value = {selected_file.name}
            />
        </div>
        <div>
            <TextFieldLabel
                label = {page_vocab.file_explorer.path[current_language]}
                value = {selected_file.path}
            />
        </div>
        <div>
            <TextFieldLabel
                label = {page_vocab.file_explorer.extension[current_language]}
                value = {selected_file.extension}
            />
        </div>
        <div>
            <TextFieldLabel
                label = {page_vocab.file_explorer.type[current_language]}
                value = {selected_file.type}
            />
        </div>
        <div>
            <TextFieldLabel
                label = {page_vocab.file_explorer.size[current_language]}
                value = {"≃ " + String(Math.floor(selected_file.size / 1048576)) + " Mo"}  
            />
        </div>
        <div>
            <TextFieldLabel
                label = {page_vocab.file_explorer.last_modified[current_language]}
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