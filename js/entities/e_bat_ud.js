/* --------------------------
Entidad del Enemigo (Bat_UD)
------------------------ */
game.BatEntityUD = me.Entity.extend({
  init: function(x, y, settings) {
    
    //Cambia el sprite dinámicamente
    var num = Math.floor((Math.random() * 2) + 1);
    
    if(num == 1){
        //Define el tamaño del sprite y las características
        settings.image = "e_bat";
        //Espacio de desplazamiento (lo devuelve del Tile)
        var width = settings.width;
        var height = settings.height;
        //Tamaño del Sprite
        settings.spritewidth = 65;
        settings.spriteheight = 50;
        //Area de Influencia
        settings.width = 65;
        settings.height = 50;
    }else{
        //Define el tamaño del sprite y las características
        settings.image = "e_ghost";
        //Espacio de desplazamiento (lo devuelve del Tile)
        var width = settings.width;
        var height = settings.height;
        //Tamaño del Sprite
        settings.spritewidth = 65;
        settings.spriteheight = 65;
        //Area de Influencia
        settings.width = 65;
        settings.height = 65;
    }
     
    //llama al constructor
    this._super(me.Entity, 'init', [x, y , settings]);
    
    //Define el tipo de entidad
    this.body.collisionType = me.collision.types.ENEMY_OBJECT;
    //Condiciona con qué va a colisionar
    this.body.setCollisionMask(me.collision.types.PROJECTILE_OBJECT | me.collision.types.PLAYER_OBJECT);
    
    // Add missing shape (melonJS 2.0.x) 
    if (this.body.shapes.length === 0) {
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
    }
    
    //acciones por cuadro
    if(num == 1){
        this.renderable.addAnimation("moverse",  [0, 1]);
    }else{
        this.renderable.addAnimation("moverse",  [0]);
    }
    this.renderable.addAnimation("muere",  [0]);
    this.renderable.setCurrentAnimation("moverse"); //default
     
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startY = y;
    this.endY   = y + height - settings.spriteheight;
    this.pos.y  = y + height - settings.spriteheight;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    //valores establecidos por el programador
    this.vida = 1;
    this.entidad = "enemigo";
    this.alwaysUpdate = true; 
    
    // to remember which side we were walking
    this.walkUp= false;

    // camina y brinco (velocidad)
    this.body.setVelocity(6, 4);
     
  },
 
  // manage the enemy movement
  update: function(dt) {
    if (this.alive) {
        this.body.gravity = 0;
        if (this.walkUp && this.pos.y <= this.startY) {
            this.walkUp = false;
        } else if (!this.walkUp && this.pos.y >= this.endY) {
            this.walkUp = true;
        }
        // make it walk
        //this.renderable.flipX(this.walkUp);
        this.body.vel.y += (this.walkUp) ? -this.body.accel.y * me.timer.tick : this.body.accel.y * me.timer.tick;
        
    }
    
    //Si está muerto
    if(!this.alive){
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
        this.body.vel.x = 0; this.body.vel.y = 0;
        if (!this.renderable.isCurrentAnimation("muere")){
            this.renderable.setCurrentAnimation("muere");
            //con Tween envío una orden con un time (300 en este caso) 
            //para desaparecer la entidad en un canal alpha 0
            new me.Tween(this.renderable)
            .to({
                "alpha" : 0
            }, 250)
            .onComplete((function () {
                me.game.world.removeChild(this);
            }).bind(this))
            .start();
    
        }
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
    if(this.alive == true){
        return true;
    }else{
        return false;
    }
  }
});