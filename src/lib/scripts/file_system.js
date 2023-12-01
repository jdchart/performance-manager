/*
References for File System API: 
https://developer.chrome.com/articles/file-system-access/
https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle
https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle
*/

// Import dependencies
import file_ignores from '$lib/data/file_ignores.json';
import { v4 as uuidv4 } from 'uuid';

export const get_file = async () => {
    /*Open a file dialogue and retrieve a file handler from local machine.*/
    
    let file_handler;
    [file_handler] = await window.showOpenFilePicker();
    if (!file_handler) {
        return;
    }
    return file_handler;
};

export const get_files = async () => {
    /*Open a folder dialogue and retrieve a list of file handlers from local machine and their paths.*/
    
    let ret = []
    let directory_handler;
    directory_handler = await window.showDirectoryPicker();
    if (!directory_handler) {
        return;
    }
    for await (const file_handle of get_files_recursively(directory_handler)) {
        ret.push(file_handle);
    };
    for(const i in ret){
        let path = await return_path_directories(directory_handler, ret[i])
        path.unshift(directory_handler.name);
        ret[i].relative_path = path;
    };
    return [ret, directory_handler];
};

export const file_list_parse = async (file_list) => {
    /*Parse a file list obtained from get_files() to JSON format*/

    let ret = {"flat" : [], "hierarchy" : {}, "total_files_size" : 0}
    for(var file of file_list){
        let open_file = await file.getFile();
        if(file_ignores["full_names"].includes(open_file.name) == false){
            let ext = open_file.name.split(".")[open_file.name.split(".").length - 1];
            if(file_ignores["extensions"].includes(ext) == false){
                let id = String(uuidv4());
                let entry = {
                    "name" : open_file.name,
                    "type" : open_file.type,
                    "size" : open_file.size,
                    "last_modified" : open_file.lastModified,
                    "path" : concat_path_array(file.relative_path),
                    "path_array" : file.relative_path,
                    "extension" : ext,
                    "id" : id,
                    "selected" : false,
                    "associated_record" : ""
                };
                ret["flat"].push(entry);
                add_keys_nested_dict(ret["hierarchy"], file.relative_path, entry)
            };
            ret["total_files_size"] = ret["total_files_size"] + open_file.size;
        };
    };
    return ret
};

function add_keys_nested_dict(d, keys, val){
    /* Helper function for file_list_parse() */
    let i = 0;
    for(let key of keys){
        if(Object.keys(d).includes(key) == false){
            d[key] = {"files" : {}, "expanded" : true}
        };

        if(i != keys.length - 1){
            d = d[key]["files"];
        }
        i++;
    };
    d[keys[keys.length - 1]] = val;
};

function concat_path_array(path_array){
    /* Take an array of folders and concatenate them into a folder path string. */
    let ret = "";
    for(let item of path_array){
        ret = ret + item + "/";
    };
    return ret.slice(0, -1);
}

async function* get_files_recursively(entry){
    /*Return a list of file handlers for all files in a folder recursively*/
    
    if(entry.kind === "file"){
        const file = await entry.getFile();
        if(file != null){
            yield entry;
        };
    }
    else if(entry.kind === "directory"){
        for await (const handle of entry.values()){
            yield* get_files_recursively(handle);
        };
    };
};

async function return_path_directories(directory_handle, handle) {
    /*Get the relative path of a file within a directory*/

    let ret = [];
    const relativePaths = await directory_handle.resolve(handle);
    for (const name of relativePaths) {
        // log each entry
        ret.push(name);
    };
    return ret;
};