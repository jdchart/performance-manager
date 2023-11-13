<script>
    import { onMount } from 'svelte';
    import TopMenu from '$lib/components/ui/workspace/TopMenu.svelte';
    import FileExplorer from '$lib/components/ui/workspace/file-explorer/FileExplorer.svelte';
    import RecordExplorer from '$lib/components/ui/workspace/record-explorer/RecordExplorer.svelte';

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
    let ontology_data = {}
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

        console.log(project_metadata);
        console.log(freeze_list);
        console.log(current_freeze);
        console.log(file_list);
        console.log(record_list);
        console.log(ontology_data);
    };
</script>

<div class="workspace_container">
    <TopMenu />

    <p>{project_metadata.project_name}</p>

    <FileExplorer
        file_list = {file_list.hierarchy}
    />

    <RecordExplorer
        record_list = {record_list}
        ontology_data = {ontology_data}
    />
</div>

<style>
    .workspace_container{
        width: 100%;
        height: 100%;
    }
</style>