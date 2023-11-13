<script>
    import { onMount } from 'svelte';
    import LanguageSelect from '$lib/components/ui/LanguageSelect.svelte';
    import SiteLogo from '$lib/components/ui/top-nav/SiteLogo.svelte';
    import TopNavButton from '$lib/components/ui/top-nav/TopNavButton.svelte';

    // Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';

    // For resizeing offset:
    let offset_div;
    let container_div;

    onMount(async () => {
        // Create offset div:
        offset_div = document.createElement('div');
        offset_div.style.height = String(container_div.offsetHeight) + 'px';
        container_div.after(offset_div);
        window.onresize = resize_menu;
    });

    function resize_menu() { 
        offset_div.style.height = String(container_div.offsetHeight) + 'px';
    };
</script>

<div id="top_nav_container" bind:this={container_div}>
    <div id="top_nav_inner_div">
        <header>
            <SiteLogo
                title = {page_vocab.top_nav.site_title[current_language]}
            />
            <div id="top_nav_nav_container">
                <nav>
                    <ul>
                        <TopNavButton
                            label = {page_vocab.top_nav.nav_edit_project[current_language]}
                            link = {"/edit-project"}
                        />
                        <TopNavButton
                            label = {page_vocab.top_nav.nav_create_project[current_language]}
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

    header{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        height: 100%;
        gap: 1em;
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

    nav{
        height:100%;
    }

    ul{
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        gap: 0.5em;
    }

    #top_nav_nav_container{
        height: 100%;
        display: flex;
    }
</style>