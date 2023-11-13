<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import FolderSelect from '$lib/components/ui/FolderSelect.svelte';
    import TextFieldInput from '$lib/components/ui/TextFieldInput.svelte';
    import SelectFieldInput from '$lib/components/ui/SelectFieldInput.svelte';
    import TextFieldLabel from '$lib/components/ui/TextFieldLabel.svelte';

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

    // Load empty project data:
    import project_data_load from '$lib/data/templates/empty_project.json';
    let project_data = utils.makeUnique(project_data_load);
    project_data["project_name"] = page_vocab.create_project.field_project_name.default[current_language];
    project_data["root_folder"] = page_vocab.create_project.field_root_folder.default[current_language];

    import record_list_load from '$lib/data/templates/empty_record_list.json';
    let record_list = utils.makeUnique(record_list_load);

    let ontology_list = [];
    let can_create = false;
    let file_list = {}

    onMount(async () => {
        update_ontology_list(); // TODO Make this change on language change trigger
	});

    async function update_ontology_list(){
        //let ontology_file_list = await server_utils.getFiles("src/lib/data/ontologies");
        let ontology_file_list = await server_utils.getDirs("src/lib/data/ontologies");
        ontology_list = [];
        for(let ontology_file of ontology_file_list){
            let content = await server_utils.readJsonFile(ontology_file.path + "/ontology.json")
            ontology_list.push({"value" : utils.get_folder(ontology_file.path), "label" : content["metadata"]["name"][current_language]})
        };
        ontology_list = ontology_list;
    };
    
    function handle_folder_input(e){
        can_create = true;
        file_list = e.detail.file_parse;

        project_data["root_folder"] = e.detail.root_directory;
        project_data["num_files"] = e.detail.file_parse["flat"].length;
        project_data["total_files_size"] = e.detail.file_parse["total_files_size"];
    };

    async function create_project(){
        if(can_create){
            project_data["project_path"] = utils.createProjectFolderPath(project_data["project_name"]);
            await server_utils.createDir(project_data["project_path"]);
            await server_utils.createDir(project_data["project_path"] + "/freezes");
            await server_utils.writeFile(project_data["project_path"] + "/metadata.json", JSON.stringify(project_data));
            
            let freeze_path = project_data["project_path"] + "/freezes/" + utils.getDateString();
            await server_utils.createDir(freeze_path);
            await server_utils.writeFile(freeze_path + "/file_list.json", JSON.stringify(file_list));

            let ontology_content = await server_utils.readJsonFile("src/lib/data/ontologies/" + project_data.ontology + "/ontology.json")
            record_list = utils.makeUnique(record_list_load);
            for(let class_entry of ontology_content["classes"]){
                record_list["records"][class_entry["unique_id"]] = []
            };
            
            await server_utils.writeFile(freeze_path + "/record_list.json", JSON.stringify(record_list));

            current_proj = project_data["project_path"];
            currentProject.set(current_proj);

            goto('/edit-project');
        };
    };
</script>

<div class="content_container">
    <div id="inner_container">
        <h2>{page_vocab.create_project.page_title[current_language]}</h2>
        
        <div id="project_create_div">

            <div>
                <TextFieldInput 
                    label = {page_vocab.create_project.field_project_name.label[current_language]}
                    bind:value = {project_data.project_name}
                />
            </div>
            
            <div>
                <SelectFieldInput
                    label = {page_vocab.create_project.field_ontology.label[current_language]}
                    bind:value = {project_data.ontology}
                    options = {ontology_list}
                />
            </div>
            
            <div>
                <FolderSelect 
                    label = {page_vocab.general_ui.select_folder[current_language]}
                    on:recieve_file_parse={(e) => handle_folder_input(e)}
                />
            </div>
            
            <div>
                <TextFieldLabel
                    label = {page_vocab.create_project.field_root_folder.label[current_language]}
                    value = {project_data.root_folder}
                />
            </div>

            <div>
                <TextFieldLabel
                    label = {page_vocab.create_project.field_num_files.label[current_language]}
                    value = {project_data.num_files}
                />
            </div>

            <div>
                <TextFieldLabel
                    label = {page_vocab.create_project.field_total_files_size.label[current_language]}
                    value = {"≃ " + String(Math.floor(project_data.total_files_size / 1048576)) + " Mo"}
                />
            </div>

            {#if can_create}
                <button class="orange_general_button" on:click={() => create_project()}>
                    <p class="button_main_label">
                        {page_vocab.create_project.create_button[current_language]}
                    </p>
                </button>
            {:else}
                <button class="orange_general_button_diabled" on:click={() => create_project()} disabled>
                    <p class="button_main_label">
                        {page_vocab.create_project.create_button[current_language]}
                    </p>
                </button>
            {/if}
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