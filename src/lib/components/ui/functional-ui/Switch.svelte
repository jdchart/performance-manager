<!-- 
    Switch between true and false
-->

<script>
    // Expose variables:
    export let label_on = "";
    export let label_off = "";
    export let val = false;

    function switch_val(){
        /* Toggle the val variable. */
        if(val == true){val = false}
        else{val = true};
        val = val;
    };
</script>

<button class="functional_ui" on:click={() => switch_val()}>{#if val == true}{label_on}{:else}{label_off}{/if}</button>