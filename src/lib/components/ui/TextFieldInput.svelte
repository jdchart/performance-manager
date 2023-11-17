<!-- 
    Basic data entry for text input.
-->

<script>
    // Expose variables:
    export let label;
    export let value;
</script>

<div class="field_entry_container">
    <p class="bold_label">{label}</p>
    <input bind:value={value}>
</div>