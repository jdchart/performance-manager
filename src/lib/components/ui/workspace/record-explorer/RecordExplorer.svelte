<!-- 
    Main record explorer component.
    TODO: Make the expand button hug the right?
-->

<script>
    // Import dependencies:
    import * as utils from "$lib/scripts/utils.js";

    // Import components:
    import RecordPreview from '$lib/components/ui/workspace/record-explorer/RecordPreview.svelte';
    import RecordEdit from '$lib/components/ui/workspace/record-explorer/RecordEdit.svelte';
    import RecordColor from '$lib/components/ui/workspace/record-explorer/RecordColor.svelte';
    import ExpandButton from '$lib/components/ui/workspace/file-explorer/ExpandButton.svelte';

    // Expose variables:
    export let record_list = {"records":{}};
    export let ontology_data = {"classes" : []};
    export let selected_record;
    
    // Selected record id for RecordEdit:
    let selected_record_id;

    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    // Expose handle_record_select()
    // TODO: This function is superfulous, expose handle_record_select() directly.
    export const select_record = (d) => {handle_record_select(d);}

    function find_class_from_id(id){
        /* 
        Return ontology class data from it's unique ID.
        TODO: consolidate this with find_class_type_from_id (only the ontology_data key changes)
        */

        for(let class_entry of ontology_data["classes"]){
            if(class_entry["unique_id"] === id){
                return class_entry;
            };
        };
    };

    function find_class_type_from_id(id){
        /* 
        Return ontology class type from it's unique ID.
        TODO: consolidate this with find_class_from_id (only the ontology_data key changes)
        */

        for(let class_entry of ontology_data["class_types"]){
            if(class_entry["unique_id"] === id){
                return class_entry;
            };
        };
    };

    function handle_update_record_list(){
        /* Trigger component update. */

        record_list = record_list;
    };

    function handle_record_select(e){
        /* 
        Select the incoming record
        TODO: This should also should open the correspond record type list
        */

        // Set all records to selected = false:
        utils.set_val_recursive("selected", false, record_list);
        
        // Set the incoming record data to selected = true:
        e.detail.record_data["selected"] = true;
        
        // Update internal selected record and selected record ID:
        selected_record = e.detail.record_data;
        selected_record_id = selected_record["record_unique_id"];

        // Trigger component update:
        record_list = record_list;
        selected_record = selected_record; // TODO: Should this be refering to main?
    };

    function all_records_lists_empty(r_list){
        /* Check if all record lists are empty. */

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
        <!-- If all record lists are empty: -->
        {#if all_records_lists_empty(record_list) === true}
            <p class="choose_file_message">({language.get_term(["record_explorer", "add_a_record"], $lang)}...)</p>
        {:else}

            <!-- Otherwise list all records: -->
            {#each Object.entries(record_list["records"]) as [class_key, inner_record_list]}   
                {#if ontology_data["classes"].length > 0}
                    {#if inner_record_list["records"].length}
                        <li>

                            <!-- Record category: -->
                            <div class="class_name">
                                <RecordColor
                                    col = {find_class_type_from_id(find_class_from_id(class_key).type).color}
                                />
                                <p>{find_class_from_id(class_key).name[$lang]} ({inner_record_list["records"].length})</p>
                                <div class="right_content">
                                    <ExpandButton
                                        bind:state = {inner_record_list["expanded"]}
                                        on:update_file_list={() => handle_update_record_list()}
                                    />
                                </div>
                            </div>    
                            {#if inner_record_list["expanded"]}

                                <!-- The record preview: -->
                                {#each inner_record_list["records"] as record}
                                    <ul class="preview_ul">
                                        <RecordPreview
                                            record_data = {record}
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

    <!-- Record edit component: -->
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