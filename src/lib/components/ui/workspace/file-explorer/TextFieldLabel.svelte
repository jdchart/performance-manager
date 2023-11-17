<!-- 
    Label value display for FileInfo.
-->

<script>
    // Expose variables:
    export let label;
    export let value;
</script>

<div class="text_file_input_container">
    <p class="bold_label">{label}</p>
    <p>{value}</p>
</div>

<style>
    .text_file_input_container{
        width: 100%;
    }

    p{
        font-size: small;
    }
</style>