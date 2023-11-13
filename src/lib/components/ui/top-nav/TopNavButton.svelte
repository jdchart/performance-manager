<script>
    export let label;
    export let link;
</script>

<li>
    <a href="{link}">
        {label}
    </a>
</li>

<style>
    a{
        text-decoration: none;
        padding-right: 0.1em;
        height: 100%;
        color: #2b2b2b;
        border-radius: 4px;
        padding: 0.5em;
    }

    a:hover{
        cursor: pointer;
        background-color: rgba(240, 248, 255, 0.085);
        transition-duration: 500ms;
    }

    li{
        height: 100%;
    }
</style>