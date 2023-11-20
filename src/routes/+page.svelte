<script>
    // Import dependencies:
    import { goto } from '$app/navigation';
    
    // Import components
    import RandomNetwork from '$lib/components/RandomNetwork.svelte';
    import BigButton from '$lib/components/ui/BigButton.svelte';

    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';
</script>

<div class="content_container">
    <!-- Display network image behind content: -->
    <div class="network_container">
        <RandomNetwork />
    </div>
    <div id="top_section">
        
        <!-- Main title slide: -->
        <p id="short_desc">
            {language.get_term(["top_nav", "site_title"], $lang)}
        </p>
        <p id="long_desc">
            {language.get_term(["top_nav", "site_description"], $lang)}
        </p>

        <!-- Main nav buttons: -->
        <div id="main_page_buttons">
            <BigButton
                top_label = {language.get_term(["top_nav", "nav_create_project"], $lang)}
                bottom_label = {language.get_term(["top_nav", "nav_create_project_desc"], $lang)}
                func = {() => goto('/create-project')}
                centre = {true}
                enabled = {true}
            />

            <BigButton
                top_label = {language.get_term(["top_nav", "nav_edit_project"], $lang)}
                bottom_label = {language.get_term(["top_nav", "nav_edit_project_desc"], $lang)}
                func = {() => goto('/edit-project')}
                centre = {true}
                enabled = {true}
            />
        </div>  
    </div>
</div>

<style>
    .network_container{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        position: absolute;
    }

    #top_section{
        margin-left: auto;
        margin-right: auto;
        width: 40em;
        padding-top: 2em;
        padding-bottom: 2em;
        height: 100vh;
        z-index: 10;
        position: relative;
    }

    #short_desc{
        padding-top: 1em;
        padding-bottom: 0.5em;
        text-align: center;
        font-size: 5em;
        font-weight: bold;
        color: #393939;
    }

    #long_desc{
        text-align: center;
        font-size: 1.5em;
        line-height: 1.5em;
        color: #797979;
    }

    #main_page_buttons{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
    }
</style>