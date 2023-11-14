<!--Wrapper for any window that you wish to be opened and closed.-->

<script>
    import * as utils from '$lib/scripts/utils.js';
    import MacButton from '$lib/components/ui/windows/MacButton.svelte';
    import { onMount } from 'svelte';

    export const openWindow = ()  => {setHidden(false)};
    export const closeWindow = () => {setHidden(true)};
    export let closeButton  = true;
    export let windowWidth  = 100; // This is given in vw
    export let windowHeight = 100; // This is given in vh
    export let hidden = true;
    
    let styleString = '';

    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    function setHidden(toSet){
        /*
        Toggle switch for setting the hidden variable.
        Will also activate or disactivate scroll on main body element.
        */
        if(toSet === false){utils.setScrollBody("hidden");}
        else{utils.setScrollBody("scroll");}
        hidden = toSet;
        dispatch('hiddenState', {
			state: toSet
		});
    };

    function updateStyleString(){
        /*
        Resize and centre the container div according to windowWidth and windowHeight in vh.
        */
        styleString = 'width:' + String(windowWidth) + 'vw;height:' + String(windowHeight) + 'vh;';
        if(windowWidth < 100){
            styleString = styleString + 'margin-left:' + String((100-windowWidth)*0.5) + 'vw;margin-right:' + String((100-windowWidth)*0.5) + 'vw;';
        }
        if(windowHeight < 100){
            styleString = styleString + 'margin-top:' + String((100-windowHeight)*0.5) + 'vh;margin-bottom:' + String((100-windowHeight)*0.5) + 'vh;';
        }
    };

    onMount(async () => {
        if(hidden === false){utils.setScrollBody("hidden");};
        updateStyleString();
	});
</script>

<svelte:window on:resize={updateStyleString}></svelte:window>

{#if hidden == false}
    <div class="blur">
        <div class="popup_container" style={styleString}>
            {#if closeButton === true}
                <div class="top_right_button">
                    <MacButton 
                        action = {() => setHidden(true)}
                        type = {"close"}
                    />
                </div>
            {/if}
            <slot />
        </div>
    </div>
{/if}

<style>
    .top_right_button{
        position: absolute;
        top:0;
        right:0;
        padding-right: 3px;
    }
</style>