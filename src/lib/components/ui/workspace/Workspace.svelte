<script>
    import { onMount } from 'svelte';
    import TopMenu from '$lib/components/ui/workspace/TopMenu.svelte';
    import FileExplorer from '$lib/components/ui/workspace/file-explorer/FileExplorer.svelte';
    import RecordExplorer from '$lib/components/ui/workspace/record-explorer/RecordExplorer.svelte';
    import AddRecord from '$lib/components/ui/AddRecord.svelte';

    let add_record_window;
    let record_explorer_bind;

    import * as server_utils from "$lib/scripts/server_utils.js";
    import * as utils from "$lib/scripts/utils.js";

    // Language handling:
    import { lang, currentProject } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    let current_proj;
	currentProject.subscribe(value => {
		current_proj = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';

    // Project data
    import project_metadata_empty_load from '$lib/data/templates/empty_project.json';
    let project_metadata = utils.makeUnique(project_metadata_empty_load);

    let file_list = [];
    let record_list = {"records" : {}};
    let ontology_data = {"classes" : []}
    let current_freeze = 0;
    let freeze_list = [];

    onMount(async () => {
        if(current_proj != ""){
            if(await server_utils.checkIfFileExists(current_proj + "/metadata.json")){
                await load_project(current_proj);
            };
        };
	});

    async function load_project(path){
        let project_metadata_load = await server_utils.readJsonFile(path + "/metadata.json");
        project_metadata = utils.makeUnique(project_metadata_load);
        freeze_list = await server_utils.getDirs(path + "/freezes", false);
        current_freeze = freeze_list.length - 1;
        
        let file_list_load = await server_utils.readJsonFile(freeze_list[current_freeze].path + "/file_list.json")
        file_list = utils.makeUnique(file_list_load);

        let record_list_load = await server_utils.readJsonFile(freeze_list[current_freeze].path + "/record_list.json")
        record_list = utils.makeUnique(record_list_load);

        let ontology_path = "src/lib/data/ontologies/" + project_metadata["ontology"] + "/ontology.json";
        let ontology_data_load = await server_utils.readJsonFile(ontology_path);
        ontology_data = utils.makeUnique(ontology_data_load);
    };

    function open_add_record(){
        add_record_window.open();
    }

    function handle_add_record_trigger(e){
        set_val_recursive("selected", false, record_list)

        record_list["records"][e.detail.record_data.unique_id]["records"].push(e.detail.record_data);
        record_list = record_list;

        record_explorer_bind.select_record({"detail" : {"record_data" : e.detail.record_data, "record_unique_id" : e.detail.record_data.unique_id}});
    }

    function set_val_recursive(key_to_set, val, dict_obj){
        for(let key of Object.keys(dict_obj)){
            if(key == key_to_set){
                dict_obj[key] = val;
            };
            if(typeof dict_obj[key] === 'object'){
                set_val_recursive(key_to_set, val, dict_obj[key])
            };
        };
    };
</script>

<AddRecord
    bind:this = {add_record_window}
    on:add_record_trigger={(e) => handle_add_record_trigger(e)}
    record_list = {record_list}
    ontology_data = {ontology_data}
/>

<div class="workspace_container">
    <div>
        <h2>{page_vocab.workspace.project[current_language]}: {project_metadata.project_name}</h2>
    </div>
    
    <div>
        <TopMenu />
    </div>
    
    <div class="file_and_record_explorers_div">
        <div>
            <h3>{page_vocab.workspace.files[current_language]}</h3>
            <div class="section_menu">
                <button class="general_button">{page_vocab.workspace.file_explorer_menu.reveal_all[current_language]}</button>
                <button class="general_button">{page_vocab.workspace.file_explorer_menu.hide_all[current_language]}</button>
                <button class="general_button">Automatic record generation</button>
                <button class="general_button">Show only unconnected records</button>
            </div>
            <FileExplorer
                file_list = {file_list.hierarchy}
            />
        </div>
        
        <div>
            <h3>{page_vocab.workspace.records[current_language]}</h3>
            <div class="section_menu">
                <button class="general_button" on:click={() => open_add_record()}>{page_vocab.workspace.record_explorer_menu.new_record[current_language]}</button>
                <button class="general_button">{page_vocab.workspace.file_explorer_menu.reveal_all[current_language]}</button>
                <button class="general_button">{page_vocab.workspace.file_explorer_menu.hide_all[current_language]}</button>
            </div>
            <RecordExplorer
                bind:this = {record_explorer_bind}
                bind:record_list = {record_list}
                ontology_data = {ontology_data}
            />
        </div>
    </div>
    
</div>

<style>
    .workspace_container{
        width: 100%;
        height: 100%;
    }

    h3{
        padding-bottom: 0.3em;
        font-weight: bold;
    }

    h2{
        font-weight: bold;
    }

    .workspace_container > * {
        padding-bottom: 0.5em;
    }

    .file_and_record_explorers_div{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
    }

    .section_menu{
        display: flex;
        align-items: center;
        gap: 0.5em;
        flex-wrap: wrap;
        padding-bottom: 0.3em;
    }

    @media (min-width: 1200px) {
        .file_and_record_explorers_div{
            grid-template-columns: 2fr 3fr;
        }
    }

    @media (max-width: 1200px) {
        .file_and_record_explorers_div{
            grid-template-columns: 1fr;
        }
    }
</style>