<script>
    import RandomNetwork from '$lib/components/RandomNetwork.svelte';

    // Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';
</script>

<!-- <div class="network_container">
    <RandomNetwork />
</div> -->

<div class="content_container">
    

    <div id="top_section">
        <p id="short_desc">
            {page_vocab.top_nav.site_title[current_language]}
        </p>
        <p id="long_desc">
            {page_vocab.top_nav.site_description[current_language]}
        </p>

        <div id="main_page_buttons">
            <div class="button_container">
                <a href="/create-project">
                <button>
                    <p class="button_main_label">
                        {page_vocab.top_nav.nav_create_project[current_language]}
                    </p>
                    <p class="button_lower_label">
                        {page_vocab.top_nav.nav_create_project_desc[current_language]}
                    </p>
                </button>
                </a>
            </div>
    
            <div class="button_container">
                <a href="/edit-project">
                <button>
                    <p class="button_main_label">
                        {page_vocab.top_nav.nav_edit_project[current_language]}
                    </p>
                    <p class="button_lower_label">
                        {page_vocab.top_nav.nav_edit_project_desc[current_language]}
                    </p>
                </button>
                </a>
            </div>
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

    .button_container{
        width: fit-content;
        margin: auto;
        margin-top: 3em;
    }

    button{
        background-color: #ffa578;
        border-radius: 0.3em;
        border: none;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 2em;
        padding-right: 2em;
    }

    button:hover{
        cursor: pointer;
        background-color: #ffc1a2;
    }

    .button_main_label{
        font-weight: bold;
        color: #393939;
    }

    .button_lower_label{
        padding-top: 0.5em;
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