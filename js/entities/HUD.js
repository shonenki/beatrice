///////////////////
// HUD
///////////////////

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(window.innerWidth , 30));
    }
});

///////////////////
// Score
///////////////////
game.HUD.ScoreItem = me.Renderable.extend( {    
  /** 
  * constructor
  */
  init: function(x, y) {
     
    // call the parent constructor 
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
     
    // create a font
    this.font = new me.BitmapFont("32x32_font", 32);
    this.font.set("right");
     
    // local copy of the global score
    this.score = -1;
    recolecta = 0;
  },
 
  /**
  * update function
  */
  update : function (dt) {
    // we don't draw anything fancy here, so just
    // return true if the score has been updated
    if (this.score !== game.data.score) {
        //Score del juego
        this.score = game.data.score;
        return true;
      
    }
    return false;
  },
 
  /**
  * draw the score
  */
  draw : function (renderer) {
    this.font.draw (renderer, game.data.score, this.pos.x, this.pos.y);
  }
});


///////////////////
// Energía 
///////////////////

//game.Energia = game.Energia || {};
//
//
//game.Energia.Container = me.Container.extend({
//
//    init: function() {
//        // call the constructor
//        this._super(me.Container, 'init');
//
//        // persistent across level change
//        this.isPersistent = true;
//
//        // make sure we use screen coordinates
//        this.floating = true;
//
//        // make sure our object is always draw first
//        this.z = Infinity;
//
//        // give a name
//        this.name = "Energia";
//
//        // add our child score object at the top left corner
//        this.addChild(new game.Energia.vida(0, 10));
//    }
//});
//
//
//game.Energia.vida = me.Renderable.extend( {    
//    init: function(x, y) {
//        // call the parent constructor 
//        this._super(me.Renderable, 'init', [x, y, 10, 10]);
//
//        // llama a la imagen
//        this.image = me.loader.getImage("life" + vida_player);
//
//    },
//
//    update : function (dt) {
//        this.image = me.loader.getImage("life" + vida_player);
//        return true;
//    },
// 
//    draw : function (context) {
//      context.drawImage(this.image, 62, this.pos.y -3);
//    }
//});
//
//
/////////////////////
//// Carga de poder
/////////////////////
//
//game.Carga = game.Carga || {};
//
//
//game.Carga.Container = me.Container.extend({
//
//    init: function() {
//        // call the constructor
//        this._super(me.Container, 'init');
//
//        // persistent across level change
//        this.isPersistent = true;
//
//        // make sure we use screen coordinates
//        this.floating = true;
//
//        // make sure our object is always draw first
//        this.z = Infinity;
//
//        // give a name
//        this.name = "Carga";
//
//        // add our child score object at the top left corner
//        this.addChild(new game.Carga.power(0, 10));
//        this.sw_reco = 0;
//        tiempo = 0;
//    }
//});
//
//
//game.Carga.power = me.Renderable.extend( {    
//    init: function(x, y) {
//        // call the parent constructor 
//        this._super(me.Renderable, 'init', [x, y, 10, 10]);
//
//        // llama a la imagen
//        this.image = me.loader.getImage("r" + recolecta);
//
//    },
//
//    update : function (dt) {
//        if(recolecta < 6){
//            tiempo = 0;
//            this.image = me.loader.getImage("r" + recolecta);
//        }else{
//            //fullpower
////            if(this.sw_reco == 0){
////                this.image = me.loader.getImage("r5");
////                this.sw_reco = 1;
////            }else{
////                this.image = me.loader.getImage("r0");
////                this.sw_reco = 0;
////            }
//            //Cronómetro de tiempo
////            tiempo++;
////            if(tiempo == 500){
////                recolecta = 0;
////                power_full = "";
////            }
//            
//        }
//        return true;
//    },
// 
//    draw : function (context) {
//      context.drawImage(this.image, 15, this.pos.y -3);
//    }
//});
