<script>
    import File from '$lib/components/ui/workspace/file-explorer/File.svelte';
    import FileInfo from '$lib/components/ui/workspace/file-explorer/FileInfo.svelte';

    export let file_list = {};
    export let selected_file;

    function select_file(e){
        set_val_recursive("selected", false, file_list);
        e.detail.selected["selected"] = true;
        selected_file = e.detail.selected;
        file_list = file_list;
    };

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

<div class="file_explorer_container">
    <ul>
        <File
            file_list = {file_list}
            expanded = {true}
            on:select_file = {(e) => select_file(e)}
        />
    </ul>
    
    <div class="file_info_wrapper">
        <FileInfo
            selected_file = {selected_file}
        />
    </div>
</div>

<style>
    .file_explorer_container{
        display: flex;
        width: 100%;
        height: 50vh;
        gap: 0.5em;
        border: 1px solid #acacac;
        border-radius: 5px;
    }

    ul{
        padding: 0.2em;
        overflow: scroll;
        height: 100%;
        width: 60%;
        border-right: 1px solid #acacac;
    }

    .file_info_wrapper{
        width: 40%;
        padding: 0.2em;
    }
</style>