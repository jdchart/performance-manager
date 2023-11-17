<!-- 
    The top navigation bar found on every page of the website.
-->

<script>
    // Import dependencies:
    import { onMount } from 'svelte';
    
    // Import components:
    import LanguageSelect from '$lib/components/ui/LanguageSelect.svelte';
    import SiteLogo from '$lib/components/ui/top-nav/SiteLogo.svelte';
    import TopNavButton from '$lib/components/ui/top-nav/TopNavButton.svelte';

    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    // For resizeing offset:
    let offset_div;
    let container_div;

    onMount(async () => {
        create_offset_div();
        // Bind the resize menu function to window resize:
        window.onresize = resize_menu;
    });

    function create_offset_div(){
        /* Append a new div element to offset elements after the top menu. */
        offset_div = document.createElement('div');
        offset_div.style.height = String(container_div.offsetHeight) + 'px';
        container_div.after(offset_div);
    };

    function resize_menu() { 
        /* Adjust the size of the offset div when win dow resizes. */
        offset_div.style.height = String(container_div.offsetHeight) + 'px';
    };
</script>

<div id="top_nav_container" bind:this={container_div}>
    <div id="top_nav_inner_div">
        <header class="general_flex_wrap">
            <SiteLogo
                title = {language.get_term(["top_nav", "site_title"], $lang)}
            />
            <div id="top_nav_nav_container">
                <nav>
                    <ul class="general_flex_wrap">
                        <TopNavButton
                            label = {language.get_term(["top_nav", "nav_edit_project"], $lang)}
                            link = {"/edit-project"}
                        />
                        <TopNavButton
                            label = {language.get_term(["top_nav", "nav_create_project"], $lang)}
                            link = {"/create-project"}
                        />
                    </ul>
                </nav>
            </div>
            <div id="top_nav_right_content">
                <LanguageSelect />
            </div>
        </header>
    </div>
</div>

<style>
    #top_nav_container{
        z-index: 995;
        width: 100%;
        position: fixed;
        background-color: rgb(85, 146, 153, 0.9);
        border-bottom: 1px solid #acacac;
        backdrop-filter: blur(10px);
    }

    #top_nav_inner_div{
        width: 100%;
        height: 100%;
        padding: 0.5em;
    }

    #top_nav_nav_container{
        height: 100%;
        display: flex;
    }

    #top_nav_right_content{
        position: absolute;
        top:0;
        right:0;
        height: 100%;
        align-items: center;
        display: flex;
        gap: 0.5em;
        flex-wrap: wrap;
        padding-right: 0.5em;
    }

    ul{
        gap: 0.5em;
    }
</style>