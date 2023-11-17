<!-- 
    The top menu for the Workspace.
-->

<script>
    // Import components:
    import GeneralButton from "$lib/components/ui/GeneralButton.svelte";

    // Expose variables:
    export let record_data;

    // Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';

    function handle_save(){
        /* Save the current freeze to the server. */
        console.log("Saving project...");
        console.log(record_data);
    };
</script>

<div>
    <ul>
        <li>
            <GeneralButton
                label = {language.get_term(["workspace", "save_project"], $lang)}
                func = {() => handle_save()}
            />
        </li>
        <li>
            <GeneralButton
                label = {language.get_term(["workspace", "open_project"], $lang)}
                func = {() => console.log("hello world")}
            />
        </li>
        <li>
            <GeneralButton
                label = {language.get_term(["workspace", "switch_freeze"], $lang)}
                func = {() => console.log("hello world")}
            />
        </li>
        <li>
            <GeneralButton
                label = {language.get_term(["workspace", "new_freeze"], $lang)}
                func = {() => console.log("hello world")}
            />
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