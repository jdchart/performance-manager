<script>
    export let record_data = {};
    export let selected_record_id = "";


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

<div>
    <button on:click={() => console.log(record_data)}>
        test
    </button>
    {#if selected_record_id != ""}    
        {get_record_from_id(record_data, selected_record_id).name["en"]}
    {:else}
        <p>Select a record...</p>
    {/if}
</div>