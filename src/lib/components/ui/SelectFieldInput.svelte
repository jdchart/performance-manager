<script>
    export let label;
    export let value;
    export let options;
</script>

<div class="text_filed_input_container">
    <p class="bold_label">{label}</p>
    <select bind:value={value}>
        {#each options as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
</div>

<style>
    .text_filed_input_container{
        display: grid;
        grid-template-columns: 1fr 4fr;
        align-items: center;
        gap: 0.5em;
        width: 100%;
    }
</style>