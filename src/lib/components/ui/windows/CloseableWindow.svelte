<!-- 
    Wrapper for any window that you wish to be opened and closed.
-->

<script>
    // Import dependencies:
    import * as utils from '$lib/scripts/utils.js';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    // Import components
    import MacButton from '$lib/components/ui/windows/MacButton.svelte';
    
    // Expose open and close window functions:
    export const open_window = ()  => {set_hidden(false)};
    export const close_window = () => {set_hidden(true)};

    // Expose variables:
    export let close_button  = true;
    export let window_width  = 100; // This is given in vw
    export let window_height = 100; // This is given in vh
    export let hidden = true;
    
    // Variable to style the window:
    let style_string = '';

    // Create event dispatcher:
    const dispatch = createEventDispatcher();

    onMount(async () => {
        // Initialize scroll setting:
        if(hidden === false){utils.set_scroll_body("hidden");};
        
        // Update the window size:
        update_style_string();
	});

    function set_hidden(to_set){
        /*
        Toggle switch for setting the hidden variable.
        Will also activate or disactivate scroll on main body element.
        */
        
        // Activate or deactivate scroll:
        if(to_set === false){utils.set_scroll_body("hidden");}
        else{utils.set_scroll_body("scroll");}
        
        // Update hidden state and dispatch event:
        hidden = to_set;
        dispatch('hiddenState', {state: to_set});
    };

    function update_style_string(){
        /* Resize and centre the container div according to window_width and window_height in vh. */
        
        // Update the style string:
        style_string = 'width:' + String(window_width) + 'vw;height:' + String(window_height) + 'vh;';
        
        // Add a margin the window width and height are less than 100 (for centring):
        if(window_width < 100){
            style_string = style_string + 'margin-left:' + String((100-window_width)*0.5) + 'vw;margin-right:' + String((100-window_width)*0.5) + 'vw;';
        }
        if(window_height < 100){
            style_string = style_string + 'margin-top:' + String((100-window_height)*0.5) + 'vh;margin-bottom:' + String((100-window_height)*0.5) + 'vh;';
        }
    };
</script>

<!-- Bind the resizing function to window resize: -->
<svelte:window on:resize={update_style_string}></svelte:window>

{#if hidden == false}
    <div class="blur">
        <div class="popup_container" style={style_string}>
            {#if close_button === true}
                <div class="top_right_button">
                    <!-- Close window button -->
                    <MacButton 
                        action = {() => set_hidden(true)}
                        type = {"close"}
                    />
                </div>
            {/if}
            <!-- Content goes here -->
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