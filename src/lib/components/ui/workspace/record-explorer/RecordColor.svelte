<script>
    export let col = "#000000";
</script>

<div class="record_color_container">
    <div style="background-color: {col};"></div>
</div>

<style>
    .record_color_container{
        width: 10px;
        height: 10px;
        margin-right: 0.5em;
    }

    .record_color_container > div{
        padding: 2px;
        height: 100%;
        width: 100%;
        border-radius: 3px;
    }
</style>