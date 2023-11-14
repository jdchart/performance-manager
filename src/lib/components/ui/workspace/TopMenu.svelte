<script>
    export let record_data;

    // Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';

    function handle_add_record(){
        record_data["records"][""]
    }
</script>

<div>
    <ul>
        <li>
            <button class="general_button">{page_vocab.workspace.open_project[current_language]}</button>
        </li>
        <li>
            <button class="general_button">{page_vocab.workspace.switch_freeze[current_language]}</button>
        </li>
        <li>
            <button class="general_button">{page_vocab.workspace.new_freeze[current_language]}</button>
        </li>
    </ul>
</div>

<style>
    ul{
        display: flex;
        gap: 0.5em;
        align-items: center;
        flex-wrap: wrap;
    }
</style>