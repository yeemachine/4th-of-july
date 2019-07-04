const canvas = document.getElementById("stage");
const ftue = document.querySelector('.ftue')

const getRandomInt = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

//PIXI CANVAS SETUP
class Stage{
  
  constructor(imagePaths, config) {
    this.imagePaths = imagePaths;
    this.config = config;
    this.fireworks = []
    this.totalFireworks = 0;
    this.time = 0;
    this.filterCounter = 0

    this.preload()
    this.setup()
    this.update()
    this.updateCursor()    
  }
  
  preload(){
    let urls, makeTextures = false;
    if(this.imagePaths.spritesheet)
      urls = [this.imagePaths.spritesheet];
    else if(this.imagePaths.textures)
      urls = this.imagePaths.textures.slice();
    else
    {
      urls = this.imagePaths.slice();
      makeTextures = true;
    }
    urls.push("https://cdn.glitch.com/5737c303-6e4f-44a9-bc1a-60808011e6ab%2Fbg.png?v=1561581924916");
    let loader = PIXI.loader;
    urls.forEach((e,i)=>{loader.add("img" + i, e)})

    loader.load(()=>{
      //collect the textures, now that they are all loaded
      let art;
      if(makeTextures)
      {
        this.art = [];
        this.imagePaths.forEach((e,i)=>{this.art.push(PIXI.Texture.fromImage(e));})
      }
      else
        this.art = this.imagePaths.art;
      //Wait for art to load before creating emitter
      this.setClickHandler();
      });
  }
  setup(){  
    // Basic PIXI Setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let rendererOptions = {view: canvas,transparency:'notMultiplied'};
    this.stage = new PIXI.Container
    this.dotF = (isMobile) ? new PIXI.filters.RGBSplitFilter() : new PIXI.filters.DotFilter(0.3);
    this.asciiF = (isMobile) ? new PIXI.filters.DotFilter(0.3) : new PIXI.filters.AsciiFilter(20);
    this.rgbSplitF = new PIXI.filters.RGBSplitFilter()
    this.filtersD = [this.dotF,this.asciiF,this.rgbSplitF]
    this.filtersM = [this.dotF,this.rgbSplitF]
    
    this.stage.filters = [
      this.asciiF,
      this.dotF
    ];
    
    console.log(this.stage)

			this.bg = new PIXI.Sprite(PIXI.Texture.fromImage("https://cdn.glitch.com/5737c303-6e4f-44a9-bc1a-60808011e6ab%2Fbg.png?v=1561581924916"));
			//bg is a 1px by 1px image
			this.bg.scale.x = canvas.width;
			this.bg.scale.y = canvas.height;
			this.bg.tint = 0x000000;
			this.stage.addChild(this.bg);
    
    this.renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, rendererOptions),
    this.elapsed = Date.now();
    // Resize the canvas to the size of the window
    window.onresize = (event) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.renderer.resize(canvas.width, canvas.height);
    };
    window.onresize();
  }
  
  update(){
      // Update the next frame
      this.updateId = requestAnimationFrame(()=>this.update());
    
      if (this.fireworks.length>0)
        this.fireworks.forEach((e,i)=>{
          if(e.smoke)
            e.smoke.update((this.time) * 0.001);
          if(e.explosion)
            e.explosion.update((this.time) * 0.001);
        })

      this.time+=.01;

      // render the stage
      this.renderer.render(this.stage);
    };
  
    setClickHandler(){
      ftue.style.opacity = 1
      canvas.addEventListener('mousedown', (e)=>{
       this.onClick(e)
      });
      canvas.addEventListener('touchstart', (e)=>{
       this.onClick(e)
      });
    }
  
    onClick(e){
      let clickPos = {x:e.offsetX || e.layerX, y:e.offsetY || e.layerY}
      if(this.totalFireworks === 0){ftue.style.opacity = 0}

      let firework = new Fireworks(this.stage,this.art,this.config,clickPos)
      this.fireworks.push(firework)
      this.totalFireworks += 1
      if((this.totalFireworks % 10)===0){
        this.filterCounter += 1
        if(this.filterCounter === 2){
          this.stage.filters = [
              this.asciiF,
              this.dotF
          ];
          this.filterCounter = 0
        }else{
          this.stage.filters = (isMobile) ? [this.dotF] : [this.asciiF] ;
        }
      }
    }
  
    setFilter(){
      if(isMobile){
        // let randomI = getRandomInt(0,1);
        // let shuffArray = shuffleArray(this.)
        
      }else{
        let randomI = getRandomInt(0,2);  
      }
    }
  
    updateCursor(){
      let cursor = document.querySelector('.cursor')
      if(isMobile){cursor.style.border = 'none'}
      canvas.addEventListener('mousemove', (e)=>{
        cursor.style.top = e.offsetY + 'px'
        cursor.style.left = e.offsetX + 'px'
      })
    }
  
    destroy(){
      cancelAnimationFrame(this.updateId);

      //reset SpriteRenderer's batching to fully release particles for GC
      if (this.renderer.plugins && this.renderer.plugins.sprite && this.renderer.plugins.sprite.sprites)
        this.renderer.plugins.sprite.sprites.length = 0;

      this.renderer.render(this.stage);
    }
}


//FIREWORKS
class Fireworks{
  
  constructor(stage,art, config,target) {
    this.stage = stage
    this.art = art
    this.config = config
    this.target = target
    this.createExplosion()
  }
  
  createSmoke(){
    let parent = this
    let emitterContainer = new PIXI.Container();
    let randomConfig = JSON.parse(JSON.stringify(this.config[0]))
    randomConfig.acceleration.y *= 1+Math.random()
    //console.log(randomConfig)
    this.stage.addChild(emitterContainer);
    this.smoke = new PIXI.particles.Emitter(
      emitterContainer,
      this.art,
      randomConfig
    );
    
    this.smoke.playOnceAndDestroy(()=>{
      pixiStage.fireworks.shift()
    });
    
    setTimeout(function(){
      parent.smoke.emit = false
    }, 3000);

    // Center on the stage
    this.smoke.updateOwnerPos(this.target.x, this.target.y);
    // console.log(pixiStage)
  }
  
  createExplosion(){
    let parent = this
    let emitterContainer = new PIXI.Container();
    let randomConfig = JSON.parse(JSON.stringify(this.config[1]))
    //console.log(randomConfig)
    this.stage.addChild(emitterContainer);
    this.explosion = new PIXI.particles.Emitter(
      emitterContainer,
      this.art,
      randomConfig
    );
    //console.log(this.explosion)
    this.explosion.playOnceAndDestroy(()=>{});
    setTimeout(function(){
      parent.explosion.emit = false
      parent.createSmoke()
    }, 500);

    // Center on the stage
    this.explosion.updateOwnerPos(this.target.x, this.target.y);
  }
}