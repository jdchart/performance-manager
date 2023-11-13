<script>
    // Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';
</script>

<footer>
    <p>&copy; {page_vocab.footer[current_language]}, 2023.</p>
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