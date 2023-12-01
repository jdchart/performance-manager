<!-- 
    Basic data entry for selecting between a list of options.
-->

<script>
    // Expose variables:
    export let label;
    export let value;
    export let options;
    export let func = () => {};

    function handle_change(){
        func();
    } 
</script>

<div class="field_entry_container">
    <p class="bold_label">{label}</p>
    <select bind:value={value} on:change={() => handle_change()}>
        {#each options as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
</div>