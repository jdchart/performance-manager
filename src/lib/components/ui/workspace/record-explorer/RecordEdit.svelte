<script>
    import TextFieldInput from "$lib/components/ui/TextFieldInput.svelte"

    export let record_data = {};
    export let selected_record_id = "";


    // Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';


    function get_record_from_id(data, id){
        for(let record_type of Object.keys(data["records"])){
            for(let record of data["records"][record_type]["records"]){
                if(record["record_unique_id"] === id){
                    return record;
                };
            }
        };
    };
</script>

<div class="record_edit_container">
    {#if selected_record_id != ""}    
        <div class="top_info_cont">
            <h4>
                {get_record_from_id(record_data, selected_record_id).name[current_language]}
            </h4>
            <p class="add_record_attribute_short_desc">{get_record_from_id(record_data, selected_record_id).long_description[current_language]}</p>
            <div class="top_info_edit_menu">
                <button class="general_button">Remove</button>
                <button class="general_button">Associate to selected file</button>
                <button class="general_button">Add relation</button>
            </div>
        </div>
        {#each get_record_from_id(record_data, selected_record_id).attributes as attr}
            <div class="field_sep">
                <TextFieldInput
                    label = {attr.name[current_language]}
                    bind:value = {attr.value}
                />
                <p class="add_record_attribute_short_desc">{attr.long_description[current_language]}</p>
            </div>
        {/each}
    {:else}
        <p class="choose_file_message">(Select a record...)</p>
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