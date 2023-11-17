<!-- 
    A popup window to create a new record.
    TODO: Consolidate this and RecordEdit.
    TODO: Resolve A11y error. Possibly change to an a element?
-->

<script>
    // Import dependencies:
    import { createEventDispatcher } from 'svelte'
    import { v4 as uuidv4 } from 'uuid';
    import * as utils from "$lib/scripts/utils.js";

    // Import components:
    import CloseableWindow from '$lib/components/ui/windows/CloseableWindow.svelte';
    import RecordColor from '$lib/components/ui/workspace/record-explorer/RecordColor.svelte';
    import TextFieldInput from "$lib/components/ui/TextFieldInput.svelte";
    import BigButton from "$lib/components/ui/BigButton.svelte";
    
    // Expose variables:
    export let record_list = {"records":{}};
    export let ontology_data = {"classes" : []};

    // Create event dispatcher:
    const dispatch = createEventDispatcher();

    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    // Internal variables:
    let append_data = {};
    let current_class_type = {};

    // Window open and close events:
    export const open = () => {
        append_data = {};
        current_class_type = {};
        window_instance.open_window()
    };
    export const close = () => {window_instance.close_window()};
    export let close_button = true;
    let window_instance;

    function find_class_from_id(id){
        /*
        Get the data of an ontology class from it's ID.
        TODO: This exists somewhere else...
        */
        for(let class_entry of ontology_data["classes"]){
            if(class_entry["unique_id"] === id){
                return class_entry;
            };
        };
    };

    function find_class_type_from_id(id){
        /*
        Get the data of an ontology class type from it's ID.
        TODO: This exists somewhere else...
        */
        for(let class_entry of ontology_data["class_types"]){
            if(class_entry["unique_id"] === id){
                return class_entry;
            };
        };
    };

    function handle_record_type_select(class_type){
        /* 
        Update the record editing area when selecting a new type. 
        TODO: handle date and list string attribute types.
        */
        
        // Get empty data according to class type:
        append_data = utils.make_unique(find_class_from_id(class_type));
        
        // Add a "value" field to each attribute
        for(let attr of append_data["attributes"]){attr["value"] = "";};
        
        // Attribute a unique ID to the record and set it to selected:
        append_data["record_unique_id"] = String(uuidv4())
        append_data["selected"] = true;

        // Update the current class type:
        current_class_type = find_class_type_from_id(append_data["type"]);
    };

    function handle_add_record(){
        /* Dispatch the add record event and close the window. */

        dispatch("add_record_trigger", {record_data : append_data, class_type : current_class_type});
        window_instance.close_window();
    };
</script>

<!-- Enclose within a CloseableWindow component: -->
<CloseableWindow bind:this={window_instance} close_button={close_button} window_width={90} window_height={90} hidden={true}>
    <div class="window_wrapper">
        <!-- Window title: -->
        <h2>{language.get_term(["workspace", "record_explorer_menu", "new_record"], $lang)}</h2>

        <div class="add_record_lower_content">
            <div>
                <h3>{language.get_term(["workspace", "add_record_popup", "type"], $lang)}</h3>
                <ul>

                    <!-- Populate with the ontology's various record types: -->
                    {#each Object.entries(record_list["records"]) as [class_key, inner_record_list]}
                    <li on:click={() => handle_record_type_select(class_key)}>
                        {#if ontology_data["classes"].length > 0}
                            <div class="class_name">
                                <RecordColor
                                    col = {find_class_type_from_id(find_class_from_id(class_key).type).color}
                                />
                                <p>{find_class_from_id(class_key).name[$lang]}</p>
                            </div>
                        {/if}
                    </li>
                    {/each}
                </ul>
            </div>
            
            <!-- Record editing area: -->
            <div class="add_record_editing_area">
                {#if Object.keys(append_data).length > 0}
                    
                    <!-- Selected record type info: -->
                    <h3>{append_data.name[$lang]}</h3>
                    <p style="font-style:italic;">{append_data.long_description[$lang]}</p>
                    {#if Object.keys(current_class_type).length > 0}
                        <p style="color: {current_class_type.color};">{current_class_type.name[$lang]}</p>
                    {/if}
                    {#each append_data.attributes as attr}
                        
                        <!-- Edit each attribute field: -->
                        <div>
                            <TextFieldInput
                                label = {attr.name[$lang]}
                                bind:value = {attr.value}
                            />
                            <p class="add_record_attribute_short_desc">{attr.long_description[$lang]}</p>
                        </div>
                    {/each}

                    <!-- Add record button: -->
                    <BigButton
                        top_label = {language.get_term(["workspace", "add_record_popup", "add"], $lang)}
                        bottom_label = {""}
                        func = {() => handle_add_record()}
                        centre = {false}
                    />

                <!-- If no record type has been selected: -->
                {:else}
                    <p class="choose_file_message">({language.get_term(["workspace", "add_record_popup", "select_record_type"], $lang)}...)</p>
                {/if}
            </div>
        </div>
    </div>
</CloseableWindow>

<style>
    .window_wrapper{
        background-color: rgba(228, 235, 235, 0.9);
        height: 100%;
        width: 100%;
        overflow: scroll;
        padding: 0.5em;
    }

    .add_record_attribute_short_desc{
        font-size: small;
        font-style: italic;
        padding-left: 1.5em;
        padding-top: 0.3em;
    }

    .choose_file_message{
        font-style: italic;
        text-align: center;
        padding-top: 2em;
    }

    .add_record_lower_content{
        padding: 1em;
        width: 100%;
        height: 100%;
        display: flex;
    }

    h3{
        padding-bottom: 0.5em;
        font-weight: bold;
    }

    ul{
        padding: 0.2em;
        padding-right: 1em;
        overflow: scroll;
        height: 100%;
        width: 100%;
        border-right: 1px solid #acacac;
        margin: 0px;
    }

    li{
        width: 100%;
    }

    .class_name{
        width: 100%;
        display: flex;
        align-items: center;
        padding-bottom: 0.3em;
    }

    .class_name:hover{
        background-color: rgba(85, 85, 85, 0.8);
        cursor: pointer;
        border-radius: 3px;
    }

    .add_record_editing_area{
        width: 100%;
        padding: 0.2em;
        padding-left: 1em;
    }

    .add_record_editing_area > *{
        padding-bottom: 0.3em;
    }
</style>