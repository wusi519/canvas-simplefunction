// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var canvas = document.getElementById('canvas');
var eraser = document.getElementById('eraser');
var brush = document.getElementById('brush');
var clear = document.getElementById('clear');
var black = document.getElementById('black');
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var thin = document.getElementById('thin');
var thick = document.getElementById('thick');
var download = document.getElementById('download');
autoSetCanvasSize(canvas);
listenToUser(canvas);

function listenToUser(canvas) {
  var context = canvas.getContext('2d');
  var useBrush = false;
  var eraserClicked = false;
  var eraserUsing = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  };
  var lineWidth = 5;

  brush.onclick = function () {
    eraserClicked = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
  };

  eraser.onclick = function () {
    eraserClicked = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
  };

  clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  black.onclick = function () {
    context.fillStyle = 'black';
    context.strokeStyle = 'black';
    black.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    red.classList.remove('active');
  };

  red.onclick = function () {
    context.fillStyle = '#DC143C';
    context.strokeStyle = '#DC143C';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
  };

  green.onclick = function () {
    context.fillStyle = '#228B22';
    context.strokeStyle = '#228B22';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
  };

  blue.onclick = function () {
    context.fillStyle = '#008080';
    context.strokeStyle = '#008080';
    blue.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
  };

  thin.onclick = function () {
    lineWidth = 5;
    thin.classList.add('active');
    thick.classList.remove('active');
  };

  thick.onclick = function () {
    thick.classList.add('active');
    thin.classList.remove('active');
    lineWidth = 15;
  };

  download.onclick = function () {
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'my picture';
    a.target = '_blank';
    a.click();
  };

  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function (e) {
      useBrush = true;
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      if (eraserClicked) {
        eraserUsing = true;

        if (eraserUsing) {
          context.clearRect(x - 10, y - 10, 20, 20);
        }
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };

    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      var newPoint = {
        x: x,
        y: y
      };

      if (eraserClicked) {
        if (eraserUsing) {
          context.clearRect(x - 10, y - 10, 20, 20);
        }
      } else {
        if (useBrush === true) {
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        }

        lastPoint = newPoint;
      }
    };

    canvas.ontouchend = function () {
      useBrush = false;
      eraserUsing = false;
    };
  } else {
    canvas.onmousedown = function (e) {
      useBrush = true;
      var x = e.clientX;
      var y = e.clientY;

      if (eraserClicked) {
        eraserUsing = true;

        if (eraserUsing) {
          context.clearRect(x - 5, y - 5, 10, 10);
        }
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };

    canvas.onmousemove = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      var newPoint = {
        x: x,
        y: y
      };

      if (eraserClicked) {
        if (eraserUsing) {
          context.clearRect(x - 5, y - 5, 10, 10);
        }
      } else {
        if (useBrush === true) {
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        }

        lastPoint = newPoint;
      }
    };

    canvas.onmouseup = function (aaa) {
      useBrush = false;
      eraserUsing = false;
    };
  }

  function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
  }
}

function autoSetCanvasSize() {
  setCanvasSize();

  window.onresize = function () {
    setCanvasSize();
  };

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
},{}],"C:/Users/32774/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "15000" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/32774/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map