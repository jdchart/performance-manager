import { v4 as uuidv4 } from 'uuid';

export const makeUnique = (toMake) => {
    /*
    Make a unique instance of data (including deep levels):
    */
    return JSON.parse(JSON.stringify(toMake));
};

export const createProjectFolderPath = (project_name, root = "src/lib/data/projects/") => {
    return root + project_name + "_" + String(uuidv4());
};

export const getDateString = () => {
    var currentdate = new Date(); 
    return String(currentdate.getDate()) + "_"
                + String((currentdate.getMonth()+1))  + "_" 
                + String(currentdate.getFullYear()) + "_"  
                + String(currentdate.getHours()) + "_"  
                + String(currentdate.getMinutes()) + "_" 
                + String(currentdate.getSeconds());
}

export const get_folder = (pathIn) => {
    let path_split = pathIn.split("/");
    return path_split[path_split.length - 1];
};