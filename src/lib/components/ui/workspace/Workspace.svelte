<!-- 
    The main project editing workspace.
    TODO: Remove tests.
    TODO: Trigger open project on start if no project currently selected.
    TODO: This could be broken up further.
-->

<script>
    // Import dependencies:
    import { onMount } from 'svelte';
    import * as server_utils from "$lib/scripts/server_utils.js";
    import * as utils from "$lib/scripts/utils.js";

    // Import components:
    import TopMenu from '$lib/components/ui/workspace/TopMenu.svelte';
    import FileExplorer from '$lib/components/ui/workspace/file-explorer/FileExplorer.svelte';
    import RecordExplorer from '$lib/components/ui/workspace/record-explorer/RecordExplorer.svelte';
    import AddRecord from '$lib/components/ui/AddRecord.svelte';
    import Button from "$lib/components/ui/functional-ui/Button.svelte";
    import Toggle from "$lib/components/ui/functional-ui/Toggle.svelte";
    import Switch from "$lib/components/ui/functional-ui/Switch.svelte";
    import RecordNetwork from "$lib/components/ui/workspace/network-vis/RecordNetwork.svelte";

    // Binds:
    let add_record_window;
    let record_explorer_bind;
    let file_explorer_bind;

    // Internal variables:
    let selected_file;
    let selected_record;
    let file_list = [];
    let record_list = {"records" : {}};
    let ontology_data = {"classes" : []}
    let current_freeze = 0;
    let freeze_list = [];


    // Language and current project handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    // Subscribe to current project store:
    import { current_project } from '$lib/scripts/stores.js';
    let current_proj;
	current_project.subscribe(value => {current_proj = value;});

    // Get empty project data
    import project_metadata_empty_load from '$lib/data/templates/empty_project.json';
    let project_metadata = utils.make_unique(project_metadata_empty_load);

    onMount(async () => {
        // Trigger initial load of current project:
        if(current_proj != ""){
            if(await server_utils.is_file(current_proj + "/metadata.json")){
                await load_project(current_proj);
            };
        };
	});

    async function load_project(path){
        /* Load an existing project at most recent freeze. */

        // Get project metadata:
        let project_metadata_load = await server_utils.read_json(path + "/metadata.json");
        project_metadata = utils.make_unique(project_metadata_load);

        // Find the most recent freeze:
        freeze_list = await server_utils.get_dirs(path + "/freezes", false);
        current_freeze = freeze_list.length - 1;
        
        // Get the freeze's file and record lists:
        let file_list_load = await server_utils.read_json(freeze_list[current_freeze].path + "/file_list.json")
        file_list = utils.make_unique(file_list_load);
        let record_list_load = await server_utils.read_json(freeze_list[current_freeze].path + "/record_list.json")
        record_list = utils.make_unique(record_list_load);

        // Load the project's ontology data:
        let ontology_path = "src/lib/data/ontologies/" + project_metadata["ontology"] + "/ontology.json";
        let ontology_data_load = await server_utils.read_json(ontology_path);
        ontology_data = utils.make_unique(ontology_data_load);
    };

    function handle_add_record_trigger(e){
        /* 
        Add a new record to the record list and select it. 
        TODO: will also have to send to the network display probably.
        */
        
        // Set all the existing records' selected == false:
        utils.set_val_recursive("selected", false, record_list)

        // Add the incoming record to the record list:
        record_list["records"][e.detail.record_data.unique_id]["records"].push(e.detail.record_data);
        
        // Trigger component update:
        record_list = record_list;

        // Send record select message to the record explorer:
        record_explorer_bind.select_record({"detail" : {"record_data" : e.detail.record_data, "record_unique_id" : e.detail.record_data.unique_id}});

        // Update file list to link to associated record:
        let associated_file_id = utils.get_attribute_value(e.detail.record_data["attributes"], "Associated file")
        if(associated_file_id != ""){
            utils.modify_file(file_list, associated_file_id, "associated_record", e.detail.record_data["record_unique_id"]);

            // TODO Remove from other records !!!!!!!!!!!

        };
        file_list = file_list;
        file_explorer_bind.trigger_update();
    };

    function handle_update_associated_record(e){
        // Update file list to link to associated record:
        let associated_file_id = utils.get_attribute_value(e.detail.record_data["attributes"], "Associated file")
        if(associated_file_id != ""){
            utils.modify_file(file_list, associated_file_id, "associated_record", e.detail.record_data["record_unique_id"]);
        };
        file_list = file_list;
        file_explorer_bind.trigger_update();
    }

    function handle_update_selected_file(e){
        console.log("upadting to", e.detail.selected_file_id)
        selected_file = e.detail.selected_file_id;
        selected_file = selected_file;
    }
</script>

<!-- A popup window for adding a new record to the record list: -->
<AddRecord
    bind:this = {add_record_window}
    on:add_record_trigger={(e) => handle_add_record_trigger(e)}
    record_list = {record_list}
    ontology_data = {ontology_data}
    file_list = {file_list}
/>

<div class="workspace_container">
    <!-- Project title: -->
    <div>
        <h2 class="bold_label">{language.get_term(["workspace", "project"], $lang)}: {project_metadata.project_name}</h2>
    </div>
    
    <!-- Top menu: -->
    <div>
        <TopMenu 
            record_data = {record_list}
        />
    </div>
    
    <div class="file_and_record_explorers_div">
        
        <!-- File handling: -->
        <div>
            <h3>{language.get_term(["workspace", "files"], $lang)}</h3>
            <div class="section_menu">
                <Switch
                    label_on = {language.get_term(["workspace", "file_explorer_menu", "reveal_all"], $lang)}
                    label_off = {language.get_term(["workspace", "file_explorer_menu", "hide_all"], $lang)}
                    func = {() => console.log("hello world")}
                />
                <Button
                    label = {language.get_term(["workspace", "file_explorer_menu", "automatic_record_gen"], $lang)}
                    func = {() => console.log("hello world")}
                />
                <Toggle
                    label = {language.get_term(["workspace", "file_explorer_menu", "show_only_unconnected"], $lang)}
                    func = {() => console.log("hello world")}
                />
            </div>
            <FileExplorer
                bind:this = {file_explorer_bind}
                bind:file_list = {file_list.hierarchy}
                selected_file = {selected_file}
                record_data = {record_list}
                ontology_data = {ontology_data}
                on:update_selected_file = {(e) => handle_update_selected_file(e)}
            />
        </div>
        
        <!-- Record handling: -->
        <div>
            <h3>{language.get_term(["workspace", "records"], $lang)}</h3>
            <div class="section_menu">
                <Switch
                    label_on = {language.get_term(["workspace", "file_explorer_menu", "reveal_all"], $lang)}
                    label_off = {language.get_term(["workspace", "file_explorer_menu", "hide_all"], $lang)}
                    func = {() => console.log("hello world")}
                />
                <Button
                    label = "+ {language.get_term(["workspace", "record_explorer_menu", "new_record"], $lang)}"
                    func = {() => add_record_window.open()}
                />
            </div>
            <RecordExplorer
                bind:this = {record_explorer_bind}
                bind:record_list = {record_list}
                ontology_data = {ontology_data}
                selected_record = {selected_record}
                file_list = {file_list}
                on:update_associated_record = {(e) => handle_update_associated_record(e)}
                selected_file_id = {selected_file}
            />
        </div>
    </div>

    <!-- Network visualisation: -->
    <RecordNetwork />
</div>

<style>
    .workspace_container{
        width: 100%;
        height: 100%;
    }

    .workspace_container > * {
        padding-bottom: 0.5em;
    }

    h3{
        padding-bottom: 0.3em;
        font-weight: bold;
        padding-left: 0.3em;
    }

    .file_and_record_explorers_div{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
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

    .section_menu{
        display: flex;
        align-items: center;
        gap: 0.5em;
        flex-wrap: wrap;
        padding-bottom: 0.3em;
    }
</style>