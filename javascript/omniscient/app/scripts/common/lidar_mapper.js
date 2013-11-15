var LidarMapper = {
  createLegend: function(el, options, h, w, colorscale, title) {
    var svg = d3.select(el)
      .selectAll('svg')
      .append('svg')
      .attr("width", w+300)
      .attr("height", h)

    //Create the title for the legend
    var text = svg.append("text")
      .attr("class", "title")
      .attr('transform', 'translate(90,0)') 
      .attr("x", w / 2)
      .attr("y", 10)
      .attr("font-size", "14px")
      .attr("fill", "#fff")
      .text(options[0]);

    //Initiate Legend	
    var legend = svg.append("g")
      .attr("class", "legend")
      .attr("height", 100)
      .attr("width", 200)
      .attr("x", w / 2)
      .attr("y", function(d, i){ return i * 20;})
      .attr('transform', 'translate(90,20)');
      //Create colour squares
      legend.selectAll('rect')
        .data(options)
        .enter()
        .append("rect")
        .attr("x", w - 65)
        .attr("y", function(d, i){ return i * 20;})
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d, i){ return colorscale(i);});
      //Create text next to squares
      legend.selectAll('text')
        .data(options)
        .enter()
        .append("text")
        .attr("x", w - 52)
        .attr("y", function(d, i){ return i * 20 + 9;})
        .attr("font-size", "14px")
        .attr("fill", "#737373")
        .text(function(d) { return d; });
  },
  draw: function(id, d, options) {
    var cfg = {
      radius: 5,
      w: 600,
      h: 600,
      factor: 1,
      factorLegend: .85,
      levels: 3,
      maxValue: 0,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      ToRight: 5,
      TranslateX: 80,
      TranslateY: 30,
      ExtraWidthX: 100,
      ExtraWidthY: 100,
      color: d3.scale.category10()
    };
    
    if('undefined' !== typeof options){
      for(var i in options){
      if('undefined' !== typeof options[i]){
        cfg[i] = options[i];
      }
      }
    }
    cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){ return d3.max(i.map( function(o){ return o; })) }));
    var allAxis = (d[0].map(function(i, j){return i}));
    var total = allAxis.length;
    var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
    var Format = d3.format('%');
    d3.select(id).select("svg").remove();
    
    var g = d3.select(id)
        .append("svg")
        .attr("width", cfg.w+cfg.extraWidthX)
        .attr("height", cfg.h+cfg.ExtraWidthY)
        .append("g")
        .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

    //Circular segments
    for(var j=0; j<cfg.levels-1; j++){
      var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
      g.selectAll(".levels")
      .data(allAxis)
      .enter()
      .append("svg:line")
      .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
      .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
      .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
      .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
      .attr("class", "line")
      .style("stroke", "white")
      .style("stroke-opacity", "0.4")
      .style("stroke-width", "0.3px")
      .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
    }

    series = 0;

    var axis = g.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    /* radius grid lines */
    // axis.append("line")
    // 	.attr("x1", cfg.w/2)
    // 	.attr("y1", cfg.h/2)
    // 	.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(d*cfg.radians/total));})
    // 	.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(d*cfg.radians/total));})
    // 	.attr("class", "line")
    // 	.style("stroke", "white")
      // .style("stroke-opacity", "0.1")
    // 	.style("stroke-width", "1px");

    /* shows the value at end of point */
    // axis.append("text")
    // 	.attr("class", "legend")
    // 	.text(function(d){return d})
    // 	.style("font-family", "sans-serif")
    // 	.style("font-size", "11px")
    // 	.attr("text-anchor", "middle")
    // 	.attr("dy", "1.5em")
    // 	.attr("transform", function(d, i){return "translate(0, -10)"})
    // 	.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(d*cfg.radians/total))-60*Math.sin(d*cfg.radians/total);})
    // 	.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(d*cfg.radians/total))-20*Math.cos(d*cfg.radians/total);});

  
    d.forEach(function(y, x, arr){
      dataValues = [];
      g.selectAll(".nodes")
      .data(y, function(j, i){
        dataValues.push([
        cfg.w/2*(1-(parseFloat(Math.max(j, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
        cfg.h/2*(1-(parseFloat(Math.max(j, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
        ]);
      });
      dataValues.push(dataValues[0]);
      g.selectAll(".area")
            .data([dataValues])
            .enter()
            .append("polygon")
            .attr("class", "lidar-mapper-series"+series)
            .style("stroke-width", "1px")
            .style("stroke", cfg.color(series))
            .attr("points",function(d) {
              var str="";
              for(var pti=0;pti<d.length;pti++){
                str=str+d[pti][0]+","+d[pti][1]+" ";
              }
              return str;
              })
            .style("fill", function(j, i){return cfg.color(series)})
            .style("fill-opacity", cfg.opacityArea)
            .on('mouseover', function (d){
                      z = "polygon."+d3.select(this).attr("class");
                      g.selectAll("polygon")
                      .transition(200)
                      .style("fill-opacity", 0.1); 
                      g.selectAll(z)
                      .transition(200)
                      .style("fill-opacity", .7);
                      })
            .on('mouseout', function(){
                      g.selectAll("polygon")
                      .transition(200)
                      .style("fill-opacity", cfg.opacityArea);
            });
      series++;
    });
    series=0;

    d.forEach(function(y, x){
      g.selectAll(".nodes")
      .data(y).enter()
      .append("svg:circle")
      .attr("class", "lidar-mapper-series"+series)
      .attr('r', cfg.radius)
      .attr("alt", function(j){return Math.max(j, 0)})
      .attr("cx", function(j, i){
        dataValues.push([
        cfg.w/2*(1-(parseFloat(Math.max(j, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
        cfg.h/2*(1-(parseFloat(Math.max(j, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
      ]);
      return cfg.w/2*(1-(Math.max(j, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
      })
      .attr("cy", function(j, i){
        return cfg.h/2*(1-(Math.max(j, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
      })
      .attr("data-id", function(j){return j})
      .style("fill", cfg.color(series)).style("fill-opacity", .1)
      .append("svg:title")
      .text(function(j){return Math.max(j, 0)});

      series++;
    });
  }
};
