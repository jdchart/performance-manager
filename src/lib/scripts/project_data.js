// Import dependencies:
import { writable, get } from 'svelte/store';
import * as utils from "$lib/scripts/utils.js";
import * as server_utils from "$lib/scripts/server_utils.js";

// Get default data:
import empty_record_list_load from '$lib/data/templates/empty_record_list.json';
let empty_record_list = utils.make_unique(empty_record_list_load);

// Expose variables:
export const current_project = writable("");
export const current_project_metadata = writable({});
export const current_freeze = writable(0);
export const current_file_list = writable([]);
export const current_record_list = writable({"records" : {}});
export const current_ontology_data = writable({"classes" : []});
export const current_selected_files = writable([]);
export const current_selected_records = writable([]);

// Export functions:
export const create_new_project = async (project_data, file_list) => {
    /* Create a new project from project data and file list. */ 

    // Get project directories:
    project_data["project_path"] = utils.create_project_folder_path(project_data["project_name"]);
    let freeze_path = project_data["project_path"] + "/freezes/" + utils.get_date_string();
    
    // Create directories:
    await server_utils.createDir(project_data["project_path"]);
    await server_utils.createDir(project_data["project_path"] + "/freezes");
    await server_utils.createDir(freeze_path);

    // Create data files:
    await server_utils.writeFile(project_data["project_path"] + "/metadata.json", JSON.stringify(project_data));
    await server_utils.writeFile(freeze_path + "/file_list.json", JSON.stringify(file_list));

    // Create an empty record list from ontology data and write the record list file:
    let rec_list = await create_empty_record_list(project_data.ontology);
    await server_utils.writeFile(freeze_path + "/record_list.json", JSON.stringify(rec_list));

    // Set the global current project store:
    current_project.set(project_data["project_path"]);     
};

export const load_project = async (path) => {
    /* Load an existing project at most recent freeze. */

    // Get project metadata:
    let project_metadata_load = await server_utils.read_json(path + "/metadata.json");
    current_project_metadata.set(utils.make_unique(project_metadata_load));

    // Find the most recent freeze:
    let freeze_list = await server_utils.get_dirs(path + "/freezes", false);
    current_freeze.set(freeze_list.length - 1);
    
    // Get the freeze's file and record lists:
    let file_list_load = await server_utils.read_json(freeze_list[get(current_freeze)].path + "/file_list.json")
    current_file_list.set(utils.make_unique(file_list_load));
    let record_list_load = await server_utils.read_json(freeze_list[get(current_freeze)].path + "/record_list.json")
    current_record_list.set(utils.make_unique(record_list_load));

    // Load the project's ontology data:
    let ontology_data_load = get_ontology_data(get(current_project_metadata)["ontology"]);
    current_ontology_data.set(utils.make_unique(ontology_data_load));
};

export const create_empty_record_list = async (ontology_folder_name) => {
    /* Create an empty record list from ontology data. */
    let ontology_content = await get_ontology_data(ontology_folder_name);
    let record_list = utils.make_unique(empty_record_list);
    for(let class_entry of ontology_content["classes"]){
        record_list["records"][class_entry["unique_id"]] = {"records" : [], "expanded" : true}
    };
    return record_list;
};

export const get_ontology_data = async (ontology_folder_name) => {
    /* Load ontology data from the ontology folder name. */
    let ontology_content = await server_utils.read_json("src/lib/data/ontologies/" + ontology_folder_name + "/ontology.json");
    return ontology_content;
};