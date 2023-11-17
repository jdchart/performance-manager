<script>
    // Use defs and use for adding elements ?
    // https://octoperf.com/blog/2018/04/18/d3-js-drag-and-drop-tutorial/#d3js-click-and-drag-events-combined
    // https://octoperf.com/blog/2018/04/17/d3-js-mouse-events-and-transitions-tutorial/#how-to-bind-data-using-d3datum

    import * as d3 from 'd3';

    import CircleTest from "$lib/components/ui/workspace/network-vis/CircleTest.svelte"

    // Bind to bounding div:
    let vis;
</script>

<div class="network_container">
    <div bind:this={vis} id="network_inner_container">
        <svg>
            <defs>
                <CircleTest
                    cx = {0}
                    cy = {0}
                    r = {7}
                    href = {"mycircle"}
                    msg = {"hello world"}
                />
            </defs>
            <use x="50" y="50" href="#mycircle" />
            <use x="0" y="0" href="#mycircle" />
        </svg>
    </div>
</div>

<style>
    .network_container{
        height: 500px;
        width: 100%;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #acacac;
    }

    #network_inner_container{
        width: 100%;
        height: 100%;
    }
</style>