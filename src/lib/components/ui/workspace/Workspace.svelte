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
    import * as project_data_handler from "$lib/scripts/project_data.js";

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

    // Internal variables:
    let selected_file;
    let selected_record;
    let record_list = {"records" : {}};
    let ontology_data = {"classes" : []};

    // Language and current project handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    // Subscribe to current project store:
    import { 
        current_project, 
        current_file_list, 
        current_record_list, 
        current_ontology_data 
    } from '$lib/scripts/project_data.js';

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

        project_data_handler.load_project(path);
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
    };
</script>

<!-- A popup window for adding a new record to the record list: -->
<AddRecord
    bind:this = {add_record_window}
    on:add_record_trigger={(e) => handle_add_record_trigger(e)}
    record_list = {$current_record_list}
    ontology_data = {$current_ontology_data}
/>

<div class="workspace_container">
    <!-- Project title: -->
    <div>
        <h2 class="bold_label">{language.get_term(["workspace", "project"], $lang)}: {project_metadata.project_name}</h2>
    </div>
    
    <!-- Top menu: -->
    <div>
        <TopMenu 
            record_data = {$current_record_list}
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
                file_list = {$current_file_list.hierarchy}
                selected_file = {selected_file}
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