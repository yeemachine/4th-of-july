//static class
let TextClass = (()=>{
  
  const logo = document.querySelector('.logo');
  let tl,ct,chars, chars2, shufflechar, shufflechar2;
  
  function _init () {
    TweenMax.set(".CT", {autoAlpha:0});
    
    tl = new TimelineMax, 
    mySplitText = new SplitText("#phrase", {type:"words,chars"}), 
    chars = mySplitText.chars; 
    
    ct = new TimelineMax, 
    mySplitText = new SplitText(".CT", {type:"words,chars"}), 
    chars2 = mySplitText.chars; 
    
    shufflechar = shuffleArray(chars);
    shufflechar2 = shuffleArray(chars2);
    
   // var masterTimeline = new TimelineMax({repeat: -1, repeatDelay: 1});
    //masterTimeline.add(animateLogo());
    // animateLogo();
  }
  
  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }
  
  
  function animateLogo() {
    TweenMax.set("#phrase", {autoAlpha: 1});
    tl.staggerFrom(chars, 0.8, {opacity:0, scale:1, transformOrigin:"0% 50% -50", ease:Back.easeOut}, 0.05, "+=0"); 
    fade();
  }
  
  function fade() {
    //tl.staggerTo(chars, 0.8, {opacity:1, scale:1, ease:Back.easeOut}, 0.2, "+=0"); 
    //console.log(tl)
    
    TweenMax.delayedCall(2, ()=>{
      tl.reverse();
      tl.eventCallback("onReverseComplete", end); 
    })

  }
  
  function end() {
    console.log("DONE");
    
    TweenMax.delayedCall(1, ()=>{
      TweenMax.set(".CT", {autoAlpha:1});
      ct.staggerFrom(chars2, 0.8, { opacity:0,scale:1, transformOrigin:"0% 50% -50", ease:Back.easeOut}, 0.05, "+=0"); 
    })
    
    TweenMax.delayedCall(3, ()=>{
      ct.reverse();
    })  
    
  } 

  /*
  function animateLogo() {
    
    tl.staggerFrom(chars, 0.8, {opacity:0, scale:1, transformOrigin:"0% 50% -50", ease:Back.easeOut}, 0.1, "+=0");
    TweenMax.delayedCall(2, ()=>{
      tl.reverse();
    })
    
    tl.eventCallback("onReverseComplete", ()=>{
      TweenMax.set(".CT", {autoAlpha:1});
      ct.staggerFrom(chars2, 0.8, { opacity:0,scale:1, transformOrigin:"0% 50% -50", ease:Back.easeOut}, 0.05, "+=0"); 
    })
    
   TweenMax.delayedCall(6, ()=>{
      ct.reverse();
    })
  } */
  
  
  return {
    init: _init,
    animateLogo: animateLogo,
    fade: fade
    //moreMethods: _moreMethods
  }
  
})();