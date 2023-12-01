<!-- 
    Component for editing the selected record in the RecordExplorer.
    TODO: Consolidate this and AddRecord.
    TODO: Create custom fields for date and list input.
-->

<script>
    // Import dependencie:
    import { createEventDispatcher } from 'svelte';

    // Create event dispatcher:
    const dispatch = createEventDispatcher();

    // Import components:
    import TextFieldInput from "$lib/components/ui/TextFieldInput.svelte";
    import GeneralButton from "$lib/components/ui/GeneralButton.svelte";
    import SelectFieldInput from "$lib/components/ui/SelectFieldInput.svelte";

    // Expose variables:
    export let record_data = {};
    export let selected_record_id = "";
    export let file_list;
    export let selected_file_id;

    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    function dispatch_update(){
        dispatch('update_associated_record', {record_data : get_record_from_id(record_data, selected_record_id)});
    };

    function handle_associate_to_selected_file(){
        console.log(selected_file_id)
        let rec_data = get_record_from_id(record_data, selected_record_id);

        rec_data["associated_file"] = selected_file_id;
        console.log(rec_data)
        dispatch('update_associated_record', {record_data : rec_data});
    };

    function get_record_from_id(data, id){
        // Return record data from record list with id.
        for(let record_type of Object.keys(data["records"])){
            for(let record of data["records"][record_type]["records"]){
                if(record["record_unique_id"] === id){
                    return record;
                };
            };
        };
    };

    function populate_file_list_select(){
        let ret = [];
        for(let file of file_list["flat"]){
            ret.push({
                "label" : file.path,
                "value" : file.id
            });
        };
        return ret;
    }
</script>

<div class="record_edit_container">
    <!-- Check there is a selected record: -->
    {#if selected_record_id != ""}    
        <!-- Top section: -->
        <div class="top_info_cont">
            <h4>
                {get_record_from_id(record_data, selected_record_id).name[$lang]}
            </h4>
            <p class="add_record_attribute_short_desc">{get_record_from_id(record_data, selected_record_id).long_description[$lang]}</p>
            <div class="top_info_edit_menu">
                <GeneralButton
                    label = {language.get_term(["record_explorer", "remove_record"], $lang)}
                    func = {() => console.log("hello world")}
                />
                <GeneralButton
                    label = {language.get_term(["record_explorer", "associate_to_file"], $lang)}
                    func = {() => handle_associate_to_selected_file()}
                />
                <GeneralButton
                    label = {language.get_term(["record_explorer", "add_relation"], $lang)}
                    func = {() => console.log("hello world")}
                />
            </div>
        </div>

        <!-- Record fields for editing: -->
        {#each get_record_from_id(record_data, selected_record_id).attributes as attr}
            <div class="field_sep">
                {#if attr.type == "string" || attr.type == "date" || attr.type == "list_string"}
                    <TextFieldInput
                        label = {attr.name[$lang]}
                        bind:value = {attr.value}
                    />
                    <p class="add_record_attribute_short_desc">{attr.long_description[$lang]}</p>
                {:else if attr.type == "file"}
                    <SelectFieldInput
                        label = {attr.name[$lang]}
                        bind:value = {attr.value}
                        options = {populate_file_list_select()}
                        func = {() => dispatch_update()}
                    />
                {/if}
            </div>
        {/each}
    <!-- If no record is selected: -->
    {:else}
        <p class="choose_file_message">({language.get_term(["record_explorer", "select_record"], $lang)}...)</p>
    {/if}
</div>

<style>
    .top_info_edit_menu{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5em;
        margin-top: 1em;
    }

    .record_edit_container{
        overflow-y: scroll;
        height: 100%;
    }

    .add_record_attribute_short_desc{
        font-size: small;
        font-style: italic;
        padding-left: 1.5em;
        padding-top: 0.3em;
    }

    .top_info_cont{
        border-bottom: 1px solid #acacac;
        padding-bottom: 1em;
        margin-bottom: 1em;
    }

    h4{
        font-weight: bold;
    }

    .field_sep{
        padding-bottom: 0.5em;
    }

    .choose_file_message{
        font-style: italic;
        text-align: center;
        padding-top: 2em;
    }
</style>