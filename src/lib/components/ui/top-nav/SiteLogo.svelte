<!-- 
    The top logo of the website with image and name. 
    Clicking leads to the home page.
-->

<script>
    // Expose attributes:
    export let title = "Performance Manager";
</script>

<div id="site_logo_container">
    <a href="/" class="link_hover">
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

    #site_logo_image{
        width: 3em;
    }
</style>