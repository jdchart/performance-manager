<!-- 
    A button along the top navigation bar.
-->

<script>
    // Expose variables:
    export let label;
    export let link;
</script>

<li>
    <a href="{link}" class="link_hover">
        {label}
    </a>
</li>

<style>
    a{
        text-decoration: none;
        padding-right: 0.1em;
        height: 100%;
        color: #393939;
        border-radius: 4px;
        padding: 0.5em;
    }

    li{
        height: 100%;
    }
</style>