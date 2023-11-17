<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    import CircleTest from "$lib/components/ui/workspace/network-vis/CircleTest.svelte"

    // Get graph data:
    let data = create_data()
    
    // Binding the container div:
    let vis;

    // Set drawing varibales:
    let xScale = d3.scaleLinear().domain([0, 10]); // this is the domain, we change the range later according to actual size
    let yScale = d3.scaleLinear().domain([0, 10]); // this is the domain, we change the range later according to actual size
    let width;
    let height;
    const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 30
    };
    
    onMount(() => {
        redraw();
        window.addEventListener('resize', redraw);
    });

    function redraw(){
        // This will empty the div, always necessary ?:
        d3.select(vis).html(null);

        // Get width and height (removing margins):
        width = d3.select(vis).node().getBoundingClientRect().width - margin.left - margin.right;
        height = d3.select(vis).node().getBoundingClientRect().height - margin.top - margin.bottom;
        
        // Update the range of scales according to the actual width and height:
        xScale.range([0, width]);
        yScale.range([height, 0]);

        // Create svg element, set size, and add a group element that is translated by the margin.
        // Note that it is this inner group that is being returned
        const svg = d3.select(vis)
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', `translate(${[margin.left, margin.top]})`); // Using `${}` like f"" in python
        
        // Draw x and y axes (each in their own group):
        svg.append('g')
            .attr('transform', `translate(${[0, height]})`)
            .call(d3.axisBottom(xScale));
        svg.append('g')
            .call(d3.axisLeft(yScale));

        // Draw points (in their own group):
        svg.append('g').selectAll('circle')
            .data(data)
            .enter()
                .append('circle')
                    .attr('cx', function (d){
                        return xScale(d.x);
                    })
                    .attr('cy', function (d) {
                        return yScale(d.y);
                    })
                    .attr('r', 7)
                    .style('fill', '#ff3e00')
                    .style('fill-opacity', '0.5')
                    .style('stroke', '#ff3e00');
    };

    function create_data(){
        let data = [];
        for (let i = 0; i < 100; ++i) {data.push({x: Math.random() * 10, y: Math.random() * 10})}
        return data;
    }
</script>

<div class="scatter_container">
    <div bind:this={vis} id="scatter_inner_container"><p>hello</p></div>
</div>

<svg width=100 height= 100>
    <CircleTest
        cx = {50}
        cy = {50}
        r = {10}
    />
</svg>


<style>
    .scatter_container{
        height: 500px;
        width: 100%;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #acacac;
    }

    #scatter_inner_container{
        width: 100%;
        height: 100%;
    }
</style>