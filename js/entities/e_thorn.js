/* --------------------------
an enemy Entity
------------------------ */
game.ThornEntity = me.Entity.extend({
  init: function(x, y, settings) {
    //Define el tamaño del sprite y las características
    settings.image = "e_thorn";
    //Espacio de desplazamiento (lo devuelve del Tile)
    var width = settings.width;
    var height = settings.height;
    //Tamaño del Sprite
    settings.spritewidth = 130;
    settings.spriteheight = 80;
    //Area de Influencia
    settings.width = settings.spritewidth;
    settings.height = settings.spriteheight;
     
    //llama al constructor
    this._super(me.Entity, 'init', [x, y , settings]);
    
    //acciones por cuadro
    this.renderable.addAnimation("moverse",  [0, 1, 2]);
    this.renderable.setCurrentAnimation("moverse"); //default
     
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.spritewidth
    this.pos.x  = x + width - settings.spritewidth;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    // to remember which side we were walking
    this.walkLeft = false;
    //valores establecidos por el programador
    //this.vida = 1;
    this.entidad = "enemigo";
    
    // camina y brinco (velocidad)
    this.body.setVelocity(4, 5);
     
  },
 
  // manage the enemy movement
  update: function(dt) {
    //gravedad
    this.body.gravity = 0;
      
    if (this.alive) {
        if (this.walkLeft && this.pos.x <= this.startX) {
            this.walkLeft = false;
        } else if (!this.walkLeft && this.pos.x >= this.endX) {
            this.walkLeft = true;
        }
        // make it walk
        //this.renderable.flipX(this.walkLeft);
        this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
    }else{
      this.body.vel.x = 0;
    }
    
    // update the body movement
    this.body.update(dt);
     
    // handle collisions against other shapes
    me.collision.check(this);
       
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) { 
    //Si retorna true la entidad se mueve, con false se qeuda estática
    return false;
  }
});