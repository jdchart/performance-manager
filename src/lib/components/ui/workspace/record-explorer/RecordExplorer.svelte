<script>
    import RecordPreview from '$lib/components/ui/workspace/record-explorer/RecordPreview.svelte';
    import RecordEdit from '$lib/components/ui/workspace/record-explorer/RecordEdit.svelte';
    import RecordColor from '$lib/components/ui/workspace/record-explorer/RecordColor.svelte';
    import ExpandButton from '$lib/components/ui/workspace/file-explorer/ExpandButton.svelte';

    export let record_list = {"records":{}};
    export let ontology_data = {"classes" : []};
    export let selected_record;
    let selected_record_id;

    // Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';

    function find_class_from_id(id){
        for(let class_entry of ontology_data["classes"]){
            if(class_entry["unique_id"] === id){
                return class_entry
            };
        };
    };

    function find_class_type_from_id(id){
        for(let class_entry of ontology_data["class_types"]){
            if(class_entry["unique_id"] === id){
                return class_entry
            }
        }
    }

    function handle_update_record_list(e){
        record_list = record_list;
    };

    export const select_record = (d) => {
        handle_record_select(d)
    }

    function handle_record_select(e){
        // Also should open the correspond record type list
        set_val_recursive("selected", false, record_list);
        e.detail.record_data["selected"] = true;
        selected_record = e.detail.record_data;
        record_list = record_list;
        
        selected_record = selected_record; // Ref to main ?
        selected_record_id = selected_record["record_unique_id"];
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

    function all_records_lists_empty(r_list){
        let all_empty = true;
        for(let inner_key of Object.keys(r_list["records"])){
            if(r_list["records"][inner_key]["records"].length > 0){
                all_empty = false;
            };
        };
        return all_empty;
    };
</script>

<div class="record_explorer_container">
    <ul>
        {#if all_records_lists_empty(record_list) === true}
            <p class="choose_file_message">(Add a record...)</p>
        {:else}
            {#each Object.entries(record_list["records"]) as [class_key, inner_record_list]}   
                {#if ontology_data["classes"].length > 0}
                    {#if inner_record_list["records"].length}
                        <li>
                            <div class="class_name">
                                <RecordColor
                                    col = {find_class_type_from_id(find_class_from_id(class_key).type).color}
                                />
                                <p>{find_class_from_id(class_key).name[current_language]} ({inner_record_list["records"].length})</p>
                                
                                <div class="right_content">
                                    <ExpandButton
                                        bind:state = {inner_record_list["expanded"]}
                                        on:update_file_list={(e) => handle_update_record_list(e)}
                                    />
                                </div>
                            </div>    
                            {#if inner_record_list["expanded"]}
                                {#each inner_record_list["records"] as record}
                                    <ul class="preview_ul">
                                        <RecordPreview
                                            record_data = {record}
                                            current_language = {current_language}
                                            on:select_record = {(e) => handle_record_select(e)}
                                        />
                                    </ul>
                                {/each}
                            {/if}
                        </li>  
                    {/if}
                {/if}
            {/each}
        {/if} 
        
    </ul>

    <div class="record_info_wrapper">
        <RecordEdit
            bind:record_data = {record_list}
            selected_record_id = {selected_record_id}
        />
    </div>
</div>

<style>
    .choose_file_message{
        font-style: italic;
        text-align: center;
        padding-top: 2em;
    }

    .record_explorer_container{
        display: flex;
        width: 100%;
        height: 50vh;
        gap: 0.5em;
        border: 1px solid #acacac;
        border-radius: 5px;
    }

    .right_content{
        padding-left: 0.5em;
        /*
        position: relative;
        top:0;
        right:0;
        height: 100%;
        align-items: center;
        display: flex;
        gap: 0.5em;
        flex-wrap: wrap;
        padding-right: 0.5em;
        */
    }

    .class_name{
        width: 100%;
        display: flex;
        align-items: center;
        padding-bottom: 0.3em;
    }

    ul{
        padding: 0.2em;
        overflow: scroll;
        height: 100%;
        width: 40%;
        border-right: 1px solid #acacac;
        background-color: rgb(243, 243, 243);
        border-radius: 5px 0 0 5px;
    }

    .preview_ul{
        padding: 0.3em;
        padding-left: 1em;
        width: 100%;
        border: none;
        overflow: auto;
    }
    
    .record_info_wrapper{
        width: 60%;
        padding: 0.2em;
    }
</style>