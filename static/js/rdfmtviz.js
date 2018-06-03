//everything in this block will be executed on pageload
$(document).ready(function() {

{
       //list of subjects and objects for the DAG
	var nodes = [];
	//connection link between subject and object ->predicates
	var links = [];
	var j=0;
	$.getJSON('../iasisrdfmts.json', function(data) {

	       for(var i in data){
		  	node = {}
		  	n =  data[i].rootType;
		  	l = data[i].rootType.lastIndexOf("/");
	  	  	name = n.substring(l+1)
		  	console.log(name);
		  	node.id=j;
			node.label=name;
			node.reflexive = true;
			//check if subject already in nodes list
			var snode = searchNode(nodes, name);
			if(snode == null){
				nodes.push(node);
				snode = node;
			}

			j++;
			linkedto = data[i].linkedTo;
		        console.log("linked to");
			console.log(linkedto);
			for (lk in linkedto){
			    console.log(lk)
				n =  linkedto[lk];
		  		li = n.lastIndexOf("/");
		  	  	lkname = n.substring(li+1);
				console.log(lkname);
			  	var node2={};
			  	node2.id=j;
		   	  	node2.label=lkname;
			  	node2.reflexive = true;

				//check if object already in nodes list
				var onode = searchNode(nodes, lkname);
				if(onode == null){
				   nodes.push(node2);
				   onode = node2;
				}

				//connects subject - predicate - object -> a single triple
				var link = {};
				link.source = snode;
				link.pred = "";
				link.target =onode;
				link.left = false;
				link.right = true;
				link.id="s"+i;
				//add to connection list array
				links.push(link);
				j++;
			}

		}
	  console.log(nodes);
    	drawWhyDAG(nodes, links);
       });


}


//draw the DAG graph using d3.js
function drawWhyDAG(nodes, links){

	var width  = 860,
    height = 800,
    colors = d3.scale.category10();
	//clear explanation body element
	$('#expBody').html("");


	var svg = d3.select('#expBody')
		.append('svg')
		.attr('width', width)
		.attr('height', height);


	// init D3 force layout
	  var force = d3.layout.force()
	      .nodes(nodes)
	      .links(links)
	      .size([width, height])
	      .linkDistance(150)
	      .charge(-500)
	      .on('tick', tick);

	  // define arrow markers for graph links
	  svg.append('svg:defs').append('svg:marker')
	      .attr('id', 'end-arrow')
	      .attr('viewBox', '0 -5 10 10')
	      .attr('refX', 16)
	      .attr('markerWidth', 3)
	      .attr('markerHeight', 3)
	      .attr('orient', 'auto')
	    .append('svg:path')
	      .attr('d', 'M0,-5L10,0L0,5')
	      .attr('fill', '#000');

	  svg.append('svg:defs').append('svg:marker')
	      .attr('id', 'start-arrow')
	      .attr('viewBox', '0 -5 10 10')
	      .attr('refX', 4)
	      .attr('markerWidth', 3)
	      .attr('markerHeight', 3)
	      .attr('orient', 'auto')
	    .append('svg:path')
	      .attr('d', 'M10,-5L0,0L10,5')
	      .attr('fill', '#000');


    // line displayed when dragging new nodes
	  var drag_line = svg.append('svg:path')
	    .attr('class', 'link dragline hidden')
	    .attr('d', 'M0,0L0,0');

	  // handles to link and node element groups
	  var path = svg.append('svg:g').selectAll('path'),
	      circle = svg.append('svg:g').selectAll('g');


	//mouse event vars
	  var selected_node = null,
	     selected_link = null;
	//update force layout (called automatically each iteration)
	  function tick() {
	    // draw directed edges with proper padding from node centers
	    path.attr('d', function(d) {
	      var deltaX = d.target.x - d.source.x,
	          deltaY = d.target.y - d.source.y,
	          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
	          normX = deltaX / dist,
	          normY = deltaY / dist,
	          sourcePadding = d.left ? 17 : 12,
	          targetPadding = d.right ? 17 : 12,
	          sourceX = d.source.x + (sourcePadding * normX),
	          sourceY = d.source.y + (sourcePadding * normY),
	          targetX = d.target.x - (targetPadding * normX),
	          targetY = d.target.y - (targetPadding * normY);
	      return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
	    });
		path.attr('id', function(d){
			  return d.id;
		});
	    circle.attr('transform', function(d) {
	      return 'translate(' + d.x + ',' + d.y + ')';
	    });
	  }


	//update graph (called when needed)
	//function restart() {
	 // path (link) group
	 path = path.data(links);

	 // update existing links
	 path.classed('selected', function(d) { return d === selected_link; })
	   .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
	   .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });


	 // add new links
	 path.enter().append('svg:path')
	   .attr('class', 'link')
	   .classed('selected', function(d) { return d === selected_link; })
	   .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
	   .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });


	 var thing = svg.append("svg:g").selectAll("text").data(links)
	 			.attr("id", "thing")
	 			.style("fill", "navy");

		thing.enter().append("text")
	 		     .style("font-size", "16px")
	 		     .attr("dx", 30)
	             .attr("dy", 18)
			.append("textPath")
	 		   .attr("xlink:href", function(d){return "#" + d.id;})
	 		    .text(function(d){
	 		    	if(d.pred.lastIndexOf("/") == -1)
	 		    		return d.pred;
	 		    	return d.pred.substring(d.pred.lastIndexOf('/'), d.pred.length);
	 		    });



	 // remove old links
	 path.exit().remove();


	 // circle (node) group
	 // NB: the function arg is crucial here! nodes are known by id, not by index!
	 circle = circle.data(nodes, function(d) { return d.id; });

	 // update existing nodes (reflexive & selected visual states)
	 circle.selectAll('circle')
	   .style('fill', function(d) { return  (d === selected_node) ?d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
	   .classed('reflexive', function(d) { return d.reflexive; });

	 // add new nodes
	 var g = circle.enter().append('svg:g');

	 g.append('svg:circle')
	   .attr('class', 'node')
	   .attr('r', 29)
	   .style('fill', function(d) { return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
	   .style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); })
	   .classed('reflexive', function(d) { return d.reflexive; });

	 /*

	  .append("svg:foreignObject")
			.attr('width', 60)
			.attr('height', 60)
			.attr('y', 5)
		    .append('xhtml:span')
			.attr("class","statement")
			.style('word-wrap','break-word')
			.style('color', 'white')
			.text(function(d) {
				return d.source;
				});

	 g.append("svg:foreignObject")
	 	.attr('width', 50)
	 	.attr('height', 50)
	 	.attr('x', 0)
	 	.attr('y', 2)
		.append('xhtml:span')
		.attr('class', 'id')
		//.style('word-wrap', 'break-word')
		.text(function(d){return d.lable;});
	 */
	 // show node IDs
	 g.append('svg:text')
	     .attr('x', 0)
	     .attr('y', 0)
	     .attr('class', 'id')
	     .text(function(d) {
	    	 if(d.label.lastIndexOf('/') == -1)
	    	 	return d.label;
	    	 return d.label.substring(d.label.lastIndexOf('/'), d.label.length);
	    	 });


	 // remove old nodes
	 circle.exit().remove();

	 // set the graph in motion
	 force.start();



}


//search the term(label) from list of nodes (subjects and objects)
//return the node object if exist, null otherwise
function searchNode(nodes, term){
	for(var i in nodes){
			// console.log(nodes[i].label  + " ====== " + term);

			if(nodes[i].label === term){

				return nodes[i];
			}
		}
	return null;
  }

});