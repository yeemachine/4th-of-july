let isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

let pixiStage = new Stage(
  // The image to use
  ["https://cdn.glitch.com/5737c303-6e4f-44a9-bc1a-60808011e6ab%2Fsmokeparticle.png?v=1561581927934", "https://cdn.glitch.com/5737c303-6e4f-44a9-bc1a-60808011e6ab%2Fparticle.png?v=1561581926307"],
  [{
    "alpha": {
      "start": 2,
      "end": 0
    },
    "scale": {
      "start": 0.4,
      "end": 1
    },
    "color": {
      list: [
        {
          value: "fb1010",
          time: 0
        },
        {
          value:'f5b830',
          time:0.5
        },
        {
          value: "0000ff",
          time: 1
        }
      ]
    },
    "speed": {
      "start": 40,
      "end": 80
    },
    "acceleration": {
      "x":1,
      "y": 42
    },
    "startRotation": {
      "min": 0,
      "max": 360
    },
    "rotationSpeed": {
      "min": 0,
      "max": 0
    },
    "lifetime": {
      "min": 3.8,
      "max": 5
    },
    "blendMode": "screen",
    "frequency": 0.01,
    "emitterLifetime": 0,
    "maxParticles": 1000,
    "pos": {
      "x": 0.5,
      "y": 0.5
    },
    "addAtBack": true,
    "spawnType": "circle",
    "spawnCircle": {
      "x": 0,
      "y": 0,
      "r": 30
    }
  },
  {
    "alpha": {
      "start": 2,
      "end": 0
    },
    "scale": {
      "start": 0.1,
      "end": 1
    },
    "color": {
      // "start": "0000ff",
      // "end": "ffffff"
        list: [
        {
          value: "ffffff",
          time: 0
        },
        {
          value:'0000ff',
          time:0.8
        },
        {
          value: "ffffff",
          time: 1
        }
      ]
    },
    "speed": {
      "start": 150,
      "end": 1
    },
    "acceleration": {
      "x":0,
      "y": 0
    },
    "startRotation": {
      "min": 0,
      "max": 360
    },
    "rotationSpeed": {
      "min": 0,
      "max": 0
    },
    "lifetime": {
      "min": 2.8,
      "max": 3.8
    },
    "blendMode": "screen",
    "frequency": 0.005,
    "emitterLifetime": 0,
    "maxParticles": 50,
    "pos": {
      "x": 0.5,
      "y": 0.5
    },
    "addAtBack": true,
    "spawnType": "circle",
    "spawnCircle": {
      "x": 0,
      "y": 0,
      "r": 10
    }
  }]
);