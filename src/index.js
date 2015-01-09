// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Surface = require('famous/core/Surface');
var EventHandler = require('famous/core/EventHandler');
var StateModifier = require('famous/modifiers/StateModifier');
var Repulsion = require('famous/physics/forces/Repulsion')
var Particle = require('famous/physics/bodies/Particle')
var PhysicsEngine = require('famous/physics/PhysicsEngine')

// create the main context
var mainContext = Engine.createContext();

// your app here
var eventA = new EventHandler();
var eventB = new EventHandler();
eventB.subscribe(eventA);

var one_image = new ImageSurface({
  content: 'images/IMG_3236.jpg',
});

var bgModifier = new Modifier({
  opacity: 0.7
});

var two_image = new ImageSurface({
  size: [300, 300],
  content: 'images/skier2.png',
  classes: ['backfaceVisibility']
});

var one_surface = new Surface ({
  size: [100, 100],
  content: 'First ever Famo.us content by Piera Damonte',
  properties: {
    color: 'white',
    backgroundColor: '#FA5C4F'
  }
});

one_surface.on('click', function() {
  eventA.emit(1);
  one_surface.setProperties({
    backgroundColor: '#78AB46'
  });
});

var surfaceModifier = new Modifier({
  align: [0.1, 0.1],
  origin: [0, 0],
});

eventB.on(1, function() {
  two_image.setContent('images/skier.png');
  var counter = 0;
  photoModifier.transformFrom(function() {
  var scaleX = Math.sin(counter++ / 20);
  var scaleY = Math.cos(counter / 40);
  return Transform.scale(scaleX, scaleY);
});
});

var initialTime = Date.now();

var photoModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.rotateZ(.005 * (Date.now() + initialTime));
  }
});

var physics = new PhysicsEngine();

var planetSurface = new Surface({
  properties: {
    backgroundColor: 'blue'
  }
});

var planetParticle = new Particle();

physics.addBody(planetParticle);

var planetModifier = new Modifier({
  size: [900, 900],
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return planetParticle.getTransform();
  }
});

var satelliteSurface = new ImageSurface({
  content: 'images/angry_bird.png',
  properties: {
  }
});

var satelliteParticle = new Particle({
  position: [0, -150, 0]
});

physics.addBody(satelliteParticle);

var satelliteModifier = new Modifier({
  size: [30, 30],
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return satelliteParticle.getTransform();
  }
});

var gravity = new Repulsion({
  strength: -2.5
});

var cat_image = new ImageSurface({
  size: [350, 200],
  content: 'images/cat.png',
});

var catModifier = new Modifier({
  align: [0, 1],
  origin: [0, 1],
});







physics.attach(gravity, satelliteParticle, planetParticle);
satelliteParticle.setVelocity([0.1, 0, 0]);

// mainContext.add(planetModifier).add(planetSurface);
mainContext.add(planetModifier).add(two_image);
mainContext.add(satelliteModifier).add(satelliteSurface);

mainContext.add(bgModifier).add(one_image);
mainContext.add(photoModifier).add(two_image);
mainContext.add(surfaceModifier).add(one_surface);
mainContext.add(catModifier).add(cat_image);







