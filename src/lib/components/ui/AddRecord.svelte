<script>
    // Import the closeable window component:
    import CloseableWindow from '$lib/components/ui/windows/CloseableWindow.svelte';
    import RecordColor from '$lib/components/ui/workspace/record-explorer/RecordColor.svelte';
    import TextFieldInput from "$lib/components/ui/TextFieldInput.svelte"
    import { createEventDispatcher } from 'svelte'
    import { v4 as uuidv4 } from 'uuid';

    const dispatch = createEventDispatcher();

    export const open = () => {
        append_data = {};
        current_class_type = {};
        windowInstance.openWindow()
    };
    export const close = () => {windowInstance.closeWindow()};
    export let closeButton = true;
    let windowInstance;

    import * as server_utils from "$lib/scripts/server_utils.js";
    import * as utils from "$lib/scripts/utils.js";

    // Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';

    export let record_list = {"records":{}};
    export let ontology_data = {"classes" : []};
    let append_data = {};
    let current_class_type = {};

    function find_class_from_id(id){
        for(let class_entry of ontology_data["classes"]){
            if(class_entry["unique_id"] === id){
                return class_entry
            }
        }
    };

    function find_class_type_from_id(id){
        for(let class_entry of ontology_data["class_types"]){
            if(class_entry["unique_id"] === id){
                return class_entry
            }
        }
    };

    function handle_record_type_select(class_type){
        append_data = utils.makeUnique(find_class_from_id(class_type));
        for(let attr of append_data["attributes"]){
            attr["value"] = "";
        }
        append_data["record_unique_id"] = String(uuidv4())
        append_data["selected"] = true;
        current_class_type = find_class_type_from_id(append_data["type"]);
    }

    function handle_add_record(){
        dispatch("add_record_trigger", {record_data : append_data, class_type : current_class_type});
        windowInstance.closeWindow();
    }
</script>

<CloseableWindow bind:this={windowInstance} closeButton={closeButton} windowWidth={90} windowHeight={90} hidden={true}>
    <div class="window_wrapper">
        <h2>{page_vocab.workspace.record_explorer_menu.new_record[current_language]}</h2>

        <div class="add_record_lower_content">
            <div>
                <h3>Type</h3>
                <ul>
                    {#each Object.entries(record_list["records"]) as [class_key, inner_record_list]}
                    <li on:click={() => handle_record_type_select(class_key)}>
                        {#if ontology_data["classes"].length > 0}
                            <div class="class_name">
                                <RecordColor
                                    col = {find_class_type_from_id(find_class_from_id(class_key).type).color}
                                />
                                <p>{find_class_from_id(class_key).name[current_language]}</p>
                            </div>
                        {/if}
                    </li>
                    {/each}
                </ul>
            </div>
            

            <div class="add_record_editing_area">
                {#if Object.keys(append_data).length > 0}
                    <h3>{append_data.name[current_language]}</h3>
                    <p style="font-style:italic;">{append_data.long_description[current_language]}</p>
                    {#if Object.keys(current_class_type).length > 0}
                        <p style="color: {current_class_type.color};">{current_class_type.name[current_language]}</p>
                    {/if}
                    {#each append_data.attributes as attr}
                        <div>
                            <TextFieldInput
                                label = {attr.name[current_language]}
                                bind:value = {attr.value}
                            />
                            <p class="add_record_attribute_short_desc">{attr.long_description[current_language]}</p>
                        </div>
                    {/each}
                    <div class="button_container">
                        <button on:click={() => handle_add_record()}>
                            <p class="button_main_label">
                                Add
                            </p>
                        </button>
                    </div>
                {:else}
                    <p class="choose_file_message">(Select a record type...)</p>
                {/if}
            </div>
        </div>
    </div>
</CloseableWindow>

<style>
    .button_container{
        /* width: fit-content;
        margin: auto;
        margin-top: 3em; */
        margin-top: 1em;
    }
    
    button{
        background-color: #ffa578;
        border-radius: 0.3em;
        border: none;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 2em;
        padding-right: 2em;
    }

    button:hover{
        cursor: pointer;
        background-color: #ffc1a2;
    }

    .button_main_label{
        font-weight: bold;
        color: #393939;
    }

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