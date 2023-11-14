<script>
    export let action;
    export let type = "close"; // "close", "expand" or "min"
</script>

<div class="button_container">
    {#if type === "close"}
        <div class="button_back close_back" on:click={action}>
            <div class="button_front close_front">
                <span>
                    <strong>x</strong>
                </span>
            </div>
        </div>
    {:else if type === "expand"}
        <div class="button_back expand_back" on:click={action}>
            <div class="button_front expand_front">
                <span>
                    <strong>+</strong>
                </span>
            </div>
        </div>
    {:else if type === "min"}
        <div class="button_back min_back" on:click={action}>
            <div class="button_front min_front">
                <span style="padding-left: 2px;">
                    <strong>-</strong>
                </span>
            </div>
        </div>
    {/if}  
</div>

<style>
    .button_container{
        padding-left: 8px;
        padding-top: 3px;
        line-height: 0px;
    }

    .button_back:hover .button_front{
        visibility: visible;
    }

    .button_back:hover{
        cursor: pointer;
    }

    .button_back{
        font-size: 9pt;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        display: inline-block;
    }

    .button_front{
        visibility: hidden;
    }

    span {
        line-height: 9px;
        vertical-align: 50%;
        font-family: HelveticaNeue, 'Helvetica Neue', 'Lucida Grande', Arial, sans-serif;
        padding-left: 1px;
    }

    .close_back{
        background: #ff5c5c;
        border: 1px solid #e33e41;
    }

    .close_back:hover{
        background: #c14645;
        border: 1px solid #b03537;
    }

    .close_front{
        color: #820005;
    }

    .expand_back{
        background: #00ca56;
        border: 1px solid #14ae46;
    }

    .expand_back:hover{
        background: #029740;
        border: 1px solid #128435;
    }

    .expand_front{
        color: #006519;
    }

    .min_back{
        background: #ffbd4c;
        border: 1px solid #e09e3e;
    }

    .min_back:hover{
        background: #c08e38;
        border: 1px solid #af7c33;
    }

    .min_front{
        color: #9a5518;
    }
</style>