<script>
    export let label;
    export let value;
</script>

<div class="text_filed_input_container">
    <p class="bold_label">{label}</p>
    <p>{value}</p>
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