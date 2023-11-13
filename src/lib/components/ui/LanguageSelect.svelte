<script>
    // Get the language store:
    import { lang } from '$lib/scripts/stores.js';

    // Retrieve the language:
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});

    // Update the language:
    function updateLang(){
        lang.set(current_language);
    }
</script>

<!--Language update select element-->
<select bind:value={current_language} on:change={() => updateLang()}>
    <option value="en">English</option>
    <option value="fr">Français</option>
</select>