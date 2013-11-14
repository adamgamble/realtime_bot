require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }
});

require(['app', 'jquery'], function (app, $) {
  'use strict';
  var uri = "ws://" + document.domain + ":1234";
  var lv, rv, status = "";
  var $left = $("#range_left");
  var $right = $("#range_right");
  var $out = $("h6");

  var ws = app.init(uri);
  status = "All systems left!";
  $(".title").text(status);

  var getPointerEvent = function(event) {
    // can give you the event type
    return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
  };

  // handle mouse changing events
  // TODO: add touch events
  $left.on("touchstart change", function(evt) {
    evt.preventDefault();
    lv = evt.target.value;
    rv = $right.val();

    app.send(lv + "," + rv);
    $out.text(lv + ", " + rv);
  });
  $right.on("touchstart change", function(evt) {
    evt.preventDefault();
    rv = evt.target.value;
    lv = $left.val();

    app.send(lv + "," + rv);
    $out.text(lv + ", " + rv);
  });

  // handle mouseup event (done with click and slide)
  $left.on("mouseup keyup touchend touchleave touchcancel", function(evt) {
    $left.val(64);
    lv = $left.val();
    rv = $right.val();

    app.send(lv + "," + rv);
    $out.text(lv + ", " + rv);
  });
  $right.on("mouseup keyup touchend touchleave touchcancel", function(evt) {
    lv = $left.val();
    $right.val(192);
    rv = $right.val();

    app.send(lv + "," + rv);
    $out.text(lv + ", " + rv);
  });

  $(document).on("keydown", function(evt) {
    switch(evt.keyCode) {
      case 70: //left up
        if(lv > 0 && gv < 128) {
          lv = Number(gv) + 1;
        }
        $left.val(lv);
        break;
      case 82: //left down
        if(lv > 0 && gv < 128) {
          lv = Number(gv) - 1;
        }
        $left.val(lv);
        break;
      case 74: //right up
        if(rv > 127 && tv < 256) {
          rv = Number(tv) + 1;
        }
        $right.val(rv);
        break;
      case 85: //right down
        if(rv > 127 && tv < 256) {
          rv = Number(tv) - 1;
        }
        $right.val(rv);
        break;
      default:
        break;
    }
    app.send(lv + "," + rv);
    $out.text(lv + ", " + rv);
  });

  // keep sending current range values
  window.setInterval(function() {
    lv = $left.val();
    rv = $right.val();
    app.send(lv + "," + rv);
  }, 250);
});
