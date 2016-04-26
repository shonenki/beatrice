/* --------------------------
Entidad del Enemigo (Bat_LR)
------------------------ */
game.BatEntityLR = me.Entity.extend({
    init: function(x, y, settings) {
        console.log(me.game.currentLevel.name);
        //Cambia el sprite dinámicamente
        if(me.game.currentLevel.name != "area_esperanza"){
            var num_ran = Math.floor((Math.random() * 3) + 1);
        }else{
            var num_ran = Math.floor((Math.random() * 4) + 1);
        }
        
        //Espacio de desplazamiento (lo devuelve del Tile)
        var width = settings.width;
        var height = settings.height;
        
        //1. Bat
        if(num_ran == 1){
            //Define el tamaño del sprite y las características
            settings.image = "e_bat";
            //Tamaño del Sprite
            settings.spritewidth = 65;
            settings.spriteheight = 50;
            //Area de Influencia
            settings.width = 65;
            settings.height = 50;
        }
        
        //2. Ghost
        if(num_ran == 2){
            //Define el tamaño del sprite y las características
            settings.image = "e_ghost";
            //Tamaño del Sprite
            settings.spritewidth = 65;
            settings.spriteheight = 65;
            //Area de Influencia
            settings.width = 65;
            settings.height = 65;
        }
        
        //3. Vamp
        if(num_ran == 3){
            //Define el tamaño del sprite y las características
            settings.image = "e_vamp";
            //Tamaño del Sprite
            settings.spritewidth = 40;
            settings.spriteheight = 60;
            //Area de Influencia
            settings.width = 40;
            settings.height = 60;
        }
        
        //4. Zombie
        if(num_ran == 4){
            //Define el tamaño del sprite y las características
            settings.image = "e_zombie";
            //Tamaño del Sprite
            settings.spritewidth = 40;
            settings.spriteheight = 60;
            //Area de Influencia
            settings.width = 40;
            settings.height = 60;
        }
        
        

        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        //Define el tipo de entidad
        this.body.collsionType = me.collision.types.ENEMY_OBJECT;
        //Condiciona con qué va a colisionar
        if(num_ran != 4){
            this.body.setCollisionMask(me.collision.types.PROJECTILE_OBJECT | me.collision.types.PLAYER_OBJECT);
        }else{
            this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.PROJECTILE_OBJECT | me.collision.types.PLAYER_OBJECT);
        }
        // Add missing shape (melonJS 2.0.x) 
        if (this.body.shapes.length === 0) {
            this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        }
        
        //acciones por cuadro
        if(num_ran == 2){
            this.renderable.addAnimation("moverse",  [0]);
        }else{
            this.renderable.addAnimation("moverse",  [0, 1], 150);
        }
        this.renderable.addAnimation("muere",  [0]);
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
        this.vida = 1;
        this.entidad = "enemigo";
        this.alwaysUpdate = true; 
        
        // camina y brinco (velocidad)
        this.body.setVelocity(4, 5);
            
        if(num_ran != 4){
            this.body.gravity = 0; //gravedad para el zombie
        }
        
    },
    
     
 
  // manage the enemy movement
  update: function(dt) { 
    
    if(me.game.currentLevel.name != "area_esperanza" && me.game.currentLevel.name != "area_final"){ 
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
                this.renderable.flipX(true);
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
                this.renderable.flipX(false);
            }
            // make it walk
            //this.renderable.flipX(this.walkLeft);
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
        }
    }else{ 
        //Corre hacia la derecha
        this.renderable.flipX(true);
        this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
        this.posicion = this.pos.x;
    }
    
    //Si está muerto
    if(!this.alive){
        this.body.vel.x = 0; this.body.vel.y = 0;
        if (!this.renderable.isCurrentAnimation("muere")){
            this.renderable.setCurrentAnimation("muere");
            //con Tween envío una orden con un time (300 en este caso) 
            //para desaparecer la entidad en un canal alpha 0
            new me.Tween(this.renderable)
            .to({
                "alpha" : 0
            }, 50)
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
        //Si el enemigo es generado es necesario crear colición también en la entidad
        if(other.name == "mainplayer"){
            if(other.body.falling && other.body.vel.y > 1){
                other.body.vel.y = -other.body.maxVel.y * me.timer.tick;
                // orden para rebotar sobre el enemigo
                other.body.jumping = true;
                //Quita vida a enemigo común
                this.alive = false;
            }
        }
        if(other.name == "bullet"){
            this.alive = false;
        }
        
        if(this.alive == true){
            return true;
        }else{
            return false;
        }
    }
});