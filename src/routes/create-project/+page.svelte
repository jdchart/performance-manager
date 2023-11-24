<!-- 
    TODO: Loading when loading a folder.
-->

<script>
    // Import dependencies:
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import * as server_utils from "$lib/scripts/server_utils.js";
    import * as utils from "$lib/scripts/utils.js";
    import * as project_data_handler from "$lib/scripts/project_data.js";

    // Import components:
    import FolderSelect from '$lib/components/ui/FolderSelect.svelte';
    import TextFieldInput from '$lib/components/ui/TextFieldInput.svelte';
    import SelectFieldInput from '$lib/components/ui/SelectFieldInput.svelte';
    import TextFieldLabel from '$lib/components/ui/TextFieldLabel.svelte';
    import BigButton from '$lib/components/ui/BigButton.svelte';

    // Internal varibales:
    let ontology_list = [];
    let can_create = false;
    let file_list = {};

    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    // Initialize empty project data:
    import project_data_load from '$lib/data/templates/empty_project.json';
    let project_data = utils.make_unique(project_data_load);
    project_data["project_name"] = language.get_term(["create_project", "field_project_name", "default"], $lang);
    project_data["root_folder"] = language.get_term(["create_project", "field_root_folder", "default"], $lang);
    
    onMount(async () => {
        // Populate the ontology list on mount:
        update_ontology_list(); // TODO: Make this change on language change trigger.
	});

    async function update_ontology_list(){
        /* Get the list of folders in the data/ontologies folder and populate ontology list. */
        
        // Get list of ontology folders:
        let ontology_file_list = await server_utils.get_dirs("src/lib/data/ontologies");
        
        // Empty the list:
        ontology_list = [];
        
        // Psuh the ontologie's path and name to the ontology list:
        for(let ontology_file of ontology_file_list){
            let content = await server_utils.read_json(ontology_file.path + "/ontology.json")
            ontology_list.push({"value" : utils.get_folder(ontology_file.path), "label" : content["metadata"]["name"][$lang]})
        };

        // Trigger update:
        ontology_list = ontology_list;
    };
    
    function handle_folder_input(e){
        /* Handle the folder input event */

        // Allow project creation a trigger update:
        can_create = true;
        can_create = can_create;
        
        // Update the file list;
        file_list = e.detail.file_parse;

        // Update project data variables:
        project_data["root_folder"] = e.detail.root_directory;
        project_data["num_files"] = e.detail.file_parse["flat"].length;
        project_data["total_files_size"] = e.detail.file_parse["total_files_size"];
    };

    async function create_project(){
        /* Create a new project with the given data and redirect to the workspace. */
        
        if(can_create){
            // Create the project on the server:
            project_data_handler.create_new_project(project_data, file_list);
            
            // Redirect to workspace page:
            goto('/edit-project');
        };
    };
</script>

<div class="content_container">
    <div id="inner_container">
        <h2>{language.get_term(["create_project", "page_title"], $lang)}</h2>
        
        <div id="project_create_div">
            <!-- Project metadata: -->
            <div>
                <TextFieldInput 
                    label = {language.get_term(["create_project", "field_project_name", "label"], $lang)}
                    bind:value = {project_data.project_name}
                />
            </div>
            <div>
                <SelectFieldInput
                    label = {language.get_term(["create_project", "field_ontology", "label"], $lang)}
                    bind:value = {project_data.ontology}
                    options = {ontology_list}
                />
            </div>
            <div>
                <FolderSelect 
                    label = {language.get_term(["general_ui", "select_folder"], $lang)}
                    on:recieve_file_parse={(e) => handle_folder_input(e)}
                />
            </div>
            <div>
                <TextFieldLabel
                    label = {language.get_term(["create_project", "field_root_folder", "label"], $lang)}
                    value = {project_data.root_folder}
                />
            </div>
            <div>
                <TextFieldLabel
                    label = {language.get_term(["create_project", "field_num_files", "label"], $lang)}
                    value = {project_data.num_files}
                />
            </div>
            <div>
                <TextFieldLabel
                    label = {language.get_term(["create_project", "field_total_files_size", "label"], $lang)}
                    value = {"≃ " + String(Math.floor(project_data.total_files_size / 1048576)) + " Mo"}
                />
            </div>

            <!-- Create project button: -->
            <BigButton
                top_label = {language.get_term(["create_project", "create_button"], $lang)}
                bottom_label = {""}
                func = {() => create_project()}
                centre = {false}
                enabled = {can_create}
            />
        </div>
    </div>
</div>

<style>
    #inner_container{
        height: 100vh;
    }

    #project_create_div{
        padding-top: 1em;
        width: 75%;
    }

    #project_create_div > *{
        margin-bottom: 1em;
    }
</style>