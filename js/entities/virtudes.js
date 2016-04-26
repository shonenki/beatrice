/*----------------
 Virtudes
 ----------------- */
game.Virtudes = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    if(me.game.currentLevel.name == "area_bondad"){ settings.image = "runa_bondad"; }
    if(me.game.currentLevel.name == "area_esperanza"){ settings.image = "runa_esperanza"; }
    if(me.game.currentLevel.name == "area_paz"){ settings.image = "runa_paz"; }
    if(me.game.currentLevel.name == "area_paciencia"){ settings.image = "runa_paciencia"; }
    if(me.game.currentLevel.name == "area_final"){ settings.image = "runa_final"; }
    
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;
 
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 60;
    settings.spritewidth = settings.height = 60;
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
    // animación (moverse)
    //Define entidad de colisión
    this.body.collisionType = me.collision.types.WORLD_SHAPE;
    this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
  },
 
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    if(other.name == "mainplayer"){
        //Varibales "session" de control
        if(me.game.currentLevel.name == "area_bondad"){ localStorage.virtud_bondad = "on"; }
        if(me.game.currentLevel.name == "area_esperanza"){ localStorage.virtud_esperanza = "on"; }
        if(me.game.currentLevel.name == "area_paz"){ localStorage.virtud_paz = "on"; }
        if(me.game.currentLevel.name == "area_paciencia"){ localStorage.virtud_paciencia = "on"; }
        if(me.game.currentLevel.name == "area_final"){ localStorage.virtud_final = "on"; }
        
        //No puede volverse a recolectar
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        // remove it
        me.game.world.removeChild(this);
        me.audio.play("recolecta");
        
        return false;
    }
    
  }
});