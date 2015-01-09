// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var StateModifier = require('famous/modifiers/StateModifier');
var Lightbox = require('famous/views/Lightbox');
var Easing = require('famous/transitions/Easing');

// create the main context
var mainContext = Engine.createContext();

// your app here
var logo = new ImageSurface({
  size: [200, 200],
  content: 'images/famous_logo.png',
  classes: ['backfaceVisibility']
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.rotateY(.002 * (Date.now() - initialTime));
  }
});

mainContext.add(centerSpinModifier).add(logo);