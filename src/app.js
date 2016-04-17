window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();


var app = {
  tableNodes: [],
  dom: {},
  searchEnable: false,
  init: function() {
    app.dom.search = $("#search").on('search', app.search);
    app.dom.result = $("#result");
    app.dom.status = $("#status");
    app.dom.result.empty();
    app.dom.status.text("");
    app.pupiResolver = null;
  },
  read: function(src) {
    app.searchEnable = false;
    var img = new Image();
    img.onload = function() {
      OCRAD(img, {
        letters_only: true,
        TOTAL_MEMORY: 33554432 * 4
      }, app.onRead);
    };
    Inspector.clear();
    app.dom.status.text("Reconociendo..");
    img.src = src;
  },
  onRead: function(text) {
    var LINES = text.trim().toUpperCase().replace(/ /gm, '').replace(/\|/g, "I").split(/[\r\n]+/).map(function(o) {
      return o.split("");
    });
    console.log(text, LINES);
    app.pupiResolver = new PupiResolver(LINES);
    app.writeTable(LINES);
    app.dom.status.text("Resultado");
  },
  writeTable: function(LINES) {
    var ctr, ctd, tr = $('<tr/>'),
      td = $('<td/>'),
      frag = document.createDocumentFragment(),
      table = $('<table/>');

    for (var l in LINES) {
      ctr = tr.clone();
      app.tableNodes[l] = [];
      for (var c in LINES[l]) {
        ctd = td.clone();
        ctd.text(LINES[l][c]);
        ctr.append(ctd);
        app.tableNodes[l][c] = ctd;
      }
      frag.appendChild(ctr[0]);
    }

    this.dom.table = table.append(frag);
    this.dom.result.html(table);
    this.searchEnable = true;
  },
  draw: function(points) {
    for (var p in points)
      app.tableNodes[points[p].y][points[p].x].attr('class', 'resalt');
  },
  search: function() {
    if (!app.searchEnable)
      return;
    this.blur();
    var points = app.pupiResolver.find(this.value.trim());
    if (points)
      app.draw(points);
  },
  clear: function(){
    app.dom.result.empty();
    app.dom.status.text("");
  }
};


var Inspector = {
  image: null,
  _x: 0,
  _y: 0,
  _w: 0,
  _h: 0,
  dom: {},
  init: function() {
    var canvas = document.createElement('canvas');
    this.jcrop = null;
    this.ctx = canvas.getContext('2d');
    // dom.btnUp = $('#up').on('mousedown mouseup', Inspector.up)
    // dom.btnDown = $('#down').on('mousedown mouseup', Inspector.down);
    this.dom.picker = $("#picker").on('change', Inspector.onLoadFile);
    this.dom.read = $("<button/>").attr('id', 'read').text('Procesar').on('click', Inspector.process);
    this.dom.cropper = $('<div/>').attr('id', 'cropper').appendTo('body');
    document.body.appendChild(canvas);
  },

  process: function(){
      Inspector.dom.read.detach();
      app.read(Inspector.getB64());
  },

  addCropper: function(){
    var that = this;
    that.dom.cropper.prepend(that.dom.read);
    this.image = $(new Image()).on('load', function fn(){
        Inspector.image.appendTo(that.dom.cropper).Jcrop({
          onSelect: Inspector._setCoords,
          onChange: Inspector._setCoords
        }, function(){
          Inspector.jcrop = this;
        });
        Inspector.draw();
    });
    this.img = this.image.get(0);
  },
  // contrastImage: function(imageData, contrast) {
  //
  //     var data = imageData.data;
  //     var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  //
  //     for(var i=0;i<data.length;i+=4)
  //     {
  //         data[i] = factor * (data[i] - 128) + 128;
  //         data[i+1] = factor * (data[i+1] - 128) + 128;
  //         data[i+2] = factor * (data[i+2] - 128) + 128;
  //     }
  //     return imageData;
  // },
  _setCoords: function (c) {
      Inspector._x = c.x;
      Inspector._y = c.y;
      Inspector._w = c.w;
      Inspector._h = c.h;
      // if (Inspector._w > 0 && Inspector._h > 0){
      //   console.log("e");
      //   var imgData = Inspector.contrastImage(Inspector.ctx.getImageData(0, 0, Inspector._w, Inspector._h), 30);
      //   Inspector.ctx.putImageData(imgData, 0, 0);
      // }
  },
  draw: function() {
    var ctx = Inspector.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.width = Inspector._w;
    ctx.canvas.height = Inspector._h;
    ctx.drawImage(Inspector.img, Inspector._x, Inspector._y, Inspector._w, Inspector._h, 0, 0, Inspector._w, Inspector._h);
    requestAnimFrame(Inspector.draw);
  },
  onLoadFile: function() {
    Inspector.clear();
    Inspector.addCropper();
    Inspector.objectURL = URL.createObjectURL(this.files[0]);
    Inspector.image.attr('src', Inspector.objectURL);
  },
  // up: function(e) {
  //   if (e.type === 'mouseup') {
  //     clearInterval(Inspector.upTimer);
  //     return;
  //   }
  //   Inspector.upTimer = setInterval(function() {
  //     Inspector._y = Math.max(Inspector._y - 1, -Inspector.image.height() + Inspector.ctx.canvas.height());
  //   })
  // },
  // down: function(e) {
  //   if (e.type === 'mouseup') {
  //     clearInterval(Inspector.downTimer);
  //     return;
  //   }
  //   Inspector.downTimer = setInterval(function() {
  //     Inspector._y = Math.min(Inspector._y + 1, 0);
  //   })
  // },
  getB64: function() {
    return this.ctx.canvas.toDataURL("image/jpeg", 100);
  },
  clear: function(){
    if (this.jcrop){
      this.jcrop.destroy();
      this.image.remove();
      this.jcrop = null;
      this.image = null;
    }
    app.clear();
    URL.revokeObjectURL(this.objectURL);
  }
};

Inspector.init();
app.init();
