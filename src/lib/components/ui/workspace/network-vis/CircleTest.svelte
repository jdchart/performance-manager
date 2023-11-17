<script>
    export let cx = 0;
    export let cy = 0;
    export let r = 7;
    export let href = "";

    export let msg = "";
</script>

<circle cx="{cx}" cy="{cy}" r="{r}" id={href}></circle>

<style>
    circle{
        fill: red;
        fill-opacity: 0.5;
        stroke: aquamarine;
    }
</style>