<script>
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte';
    
    import gsap from 'gsap';
    import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js"

    export let numNodes = 30;
    export let numEdges = 30;

    let svgElement;
    let containerWidth;
    let containerHeight;
    let networkData;

    const svgns = "http://www.w3.org/2000/svg";

    onMount(async () => {
        
        gsap.registerPlugin(MotionPathPlugin);


        networkData = createNetworkData();
        drawNetwork();

        gsap.ticker.add(updateLines)

    
        for(var i = 0; i < numNodes; i++){
            gsap.to(
                "#svg_node_" + String(i),
                {
                    duration : Math.floor(Math.random() * 100) + 50,
                    motionPath : "#svg_node_path_" + String(i),
                    repeat : -1
                }
            )
        }
 
	});

    

	onDestroy(() => packDown());

    function packDown() {
        gsap.ticker.remove(updateLines);
    }

    function randomPath(startX, startY){
        let ret = "M" + String(startX) + "," + String(startY)
        
        for(var i = 0; i < 10; i++){
            let nextX = startX + (Math.floor(Math.random() * 50) * [1, -1][Math.floor(Math.random() * 2)])
            let nextY = startY + (Math.floor(Math.random() * 50) * [1, -1][Math.floor(Math.random() * 2)])
            ret = ret + " L" + String(nextX) + "," + String(nextY)
        }
        
        ret = ret + " L" + String(startX) + "," + String(startY)

        return ret;
    }

    function drawNetwork(){
        networkData["edges"].forEach((edge) => {
            let newEdge = document.createElementNS(svgns, "line");

            newEdge.setAttribute("x1", String(networkData["nodes"][edge["source"]]["x"]));
            newEdge.setAttribute("y1", String(networkData["nodes"][edge["source"]]["y"]));
            newEdge.setAttribute("x2", String(networkData["nodes"][edge["target"]]["x"]));
            newEdge.setAttribute("y2", String(networkData["nodes"][edge["target"]]["y"]));
            newEdge.setAttribute("stroke-width", "2");
            newEdge.setAttribute("stroke", "rgb(204, 204, 204)");
            newEdge.setAttribute("id", String(edge["id"]));

            svgElement.appendChild(newEdge)
        });

        networkData["nodes"].forEach((node) => {
            let newNode = document.createElementNS(svgns, "circle");

            newNode.setAttribute("cx", String(node["x"]));
            newNode.setAttribute("cy", String(node["y"]));
            newNode.setAttribute("id", String(node["id"]));
            newNode.setAttribute("r", "10");
            newNode.setAttribute("fill", "rgb(143, 217, 242");
            newNode.setAttribute("stroke-width", "2");
            newNode.setAttribute("stroke", "rgb(204, 204, 204)");

            svgElement.appendChild(newNode)

            let newPath = document.createElementNS(svgns, "path");
            newPath.setAttribute("id", String(node["path_id"]));
            newPath.setAttribute("d", randomPath(0, 0));
            newPath.setAttribute("fill", "rgb(143, 217, 242,0");

            svgElement.appendChild(newPath)
        });

    }

    function updateLines(){
        for(var i = 0; i < numEdges; i++){

            let theEdge = networkData["edges"][i];

            let newEdge = document.getElementById("svg_line_" + String(i));

            let sourceTransform = getTransform(networkData["nodes"][theEdge["source"]]["id"])
            let targetTransform = getTransform(networkData["nodes"][theEdge["target"]]["id"])

            newEdge.setAttribute("x1", String(networkData["nodes"][theEdge["source"]]["x"] + sourceTransform[0]));
            newEdge.setAttribute("y1", String(networkData["nodes"][theEdge["source"]]["y"] + sourceTransform[1]));
            newEdge.setAttribute("x2", String(networkData["nodes"][theEdge["target"]]["x"] + targetTransform[0]));
            newEdge.setAttribute("y2", String(networkData["nodes"][theEdge["target"]]["y"] + targetTransform[1]));
        };
    }

    function getTransform(elementID){
        let el = document.getElementById(elementID);
        let trans = el.getAttribute("transform");
        let split = trans.split(",")
        let xTrans = split[4]
        let yTrans = split[5].split(")")[0]

        return [parseFloat(xTrans), parseFloat(yTrans)];
    }

    function getRandomPosition(index){
        return {
            "x" : Math.floor(Math.random() * containerWidth), 
            "y" : Math.floor(Math.random() * containerHeight),
            "id" : "svg_node_" + String(index),
            "path_id" : "svg_node_path_" + String(index),
        };
    };

    function getRandomEdge(index){
        return {
            "source" : Math.floor(Math.random() * numNodes),
            "target" : Math.floor(Math.random() * numNodes),
            "id" : "svg_line_" + String(index)
        }
    }

    function createNetworkData(){
        let ret = {"nodes" : [], "edges" : []}
        for(var i = 0; i < numNodes; i++){
            ret["nodes"].push(getRandomPosition(i));
        };
        for(var i = 0; i < numEdges; i++){
            ret["edges"].push(getRandomEdge(i))
        }
        return ret
    };
</script>

<div bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} class="container">
    <svg bind:this={svgElement}></svg>
</div>
    
<style>

    .container{
        width: 100%;
        height: 100%;
    }

    svg{
        width: 100%;
        height: 100%;
    }

</style>