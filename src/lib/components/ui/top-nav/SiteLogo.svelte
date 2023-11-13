<script>
    export let title = "Performance Manager";
</script>

<div id="site_logo_container">
    <a href="/">
        <img src="images/site-logo.png" alt="Performance manager website logo" id="site_logo_image">
        <h1>{title}</h1>
    </a>
</div>

<style>
    a{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        gap: 0.5em;
        text-decoration: none;
        padding-right: 0.1em;
        border-radius: 4px;
    }

    a:hover{
        cursor: pointer;
        background-color: rgba(240, 248, 255, 0.085);
        transition-duration: 500ms;
    }

    #site_logo_image{
        width: 3em;
    }

    h1{
        color: #2b2b2b;
    }
</style>