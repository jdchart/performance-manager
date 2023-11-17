<!-- 
    Big button component.
-->

<script>
    // Expose variables:
    export let top_label = "";
    export let bottom_label = "";
    export let func;
    export let centre = true;
</script>

<div class="{centre ? 'button_container_centre' : 'button_container'}">
    <button on:click={() => func()}>
        <p class="button_main_label">
            {top_label}
        </p>
        {#if bottom_label != ""}
            <p class="button_lower_label">
                {bottom_label}
            </p>
        {/if}
    </button>
</div>

<style>
    .button_container_centre{
        width: fit-content;
        margin: auto;
        margin-top: 3em;
    }

    .button_container{
        margin-top: 1em;
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
</style>