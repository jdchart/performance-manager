<!-- 
    Footer component displayed along the bottom of all pages.
-->

<script>
    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';
</script>

<footer>
    <p>&copy; {language.get_term(["footer"], $lang)}, 2023.</p>
</footer>

<style>
    footer{
        padding-top: 5px;
        padding-bottom: 5px;
        width: 100%;
        margin: auto;
        background-color: gainsboro;
        border: 1px solid #acacac;
    }

    p{
        color: grey;
        margin: auto;
        text-align: center;
        font-size: smaller;
    }
</style>