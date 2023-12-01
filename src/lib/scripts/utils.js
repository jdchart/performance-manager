import { v4 as uuidv4 } from 'uuid';

export const make_unique = (toMake) => {
    /* Make a unique instance of data (including deep levels). */
    return JSON.parse(JSON.stringify(toMake));
};

export const create_project_folder_path = (project_name, root = "src/lib/data/projects/") => {
    /* Return the folder of a new project. */

    return root + project_name + "_" + String(uuidv4());
};

export const get_attribute_value = (attribute_arr, attribute_name_en) => {
    for(let i = 0; i < attribute_arr.length; i++){
        if (attribute_arr[i]["name"]["en"] == attribute_name_en){
            return attribute_arr[i]["value"];
        }
    };
};

export const modify_file = (file_list, file_id, field_key, new_val, remove_others = true) => {
    /* Update both flat and hierarchical representations of a file. */
    for(let file of file_list["flat"]){
        if(remove_others == true){
            if(file[field_key] == new_val){
                file[field_key] = "";
            }
        }
        if(file["id"] == file_id){
            file[field_key] = new_val;
        };
    };
    modify_file_recursive(file_list["hierarchy"], file_id, field_key, new_val);
};

function modify_file_recursive(file_list, file_id, field_key, new_val, remove_others = true){
    /* Function for updating a field of the hierarchical representation of a file. */
    for(let key of Object.keys(file_list)){
        let next_key_list = Object.keys(file_list[key]);
        if(next_key_list.includes("files")){
            modify_file_recursive(file_list[key]["files"], file_id, field_key, new_val);
        }
        else{
            if(remove_others == true){
                if(file_list[key][field_key] == new_val){
                    file_list[key][field_key] = "";
                }
            }
            if(file_list[key]["id"] == file_id){
                file_list[key][field_key] = new_val
            };
        };
    };
};

export const get_date_string = () => {
    /* Return the current date time as a string */

    var currentdate = new Date(); 
    return String(currentdate.getDate()) + "_"
                + String((currentdate.getMonth()+1))  + "_" 
                + String(currentdate.getFullYear()) + "_"  
                + String(currentdate.getHours()) + "_"  
                + String(currentdate.getMinutes()) + "_" 
                + String(currentdate.getSeconds());
}

export const get_folder = (path_in) => {
    /* Get the last folder in a folder path string */

    let path_split = path_in.split("/");
    return path_split[path_split.length - 1];
};

export const set_scroll_body = (val) => {
    /*
    Set the value of scroll for the main <body> HTML element.
    For example: 'scroll' or 'hidden'.
    Useful for deactivating scroll for popups.
    */
    var body_el = document.body;
    body_el.style.overflow = val;
};

export const query_dict_with_list = (d, key_list) => {
    /* Provide a list of keys to query a nested dict */
    if(key_list.length == 1){
        return d[key_list];
    }else{
        const shifted = key_list.slice(1);
        return query_dict_with_list(d[key_list[0]], shifted);
    };
};

export const set_val_recursive = (key_to_set, val, dict_obj) => {
    /* Given a dictionary, set all occurences of the given key to the given value */
    
    for(let key of Object.keys(dict_obj)){
        if(key == key_to_set){
            dict_obj[key] = val;
        };
        if(typeof dict_obj[key] === 'object'){
            set_val_recursive(key_to_set, val, dict_obj[key])
        };
    };
};