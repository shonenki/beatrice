/*----------------
Balas a la derecha
------------------------ */
game.RBulletEntity= me.Entity.extend({ 
    init: function (x, y, settings) {    
        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        //Define el tipo de entidad
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.ENEMY_OBJECT);
        // Add missing shape (melonJS 2.0.x) 
        if (this.body.shapes.length === 0) {
            this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        }
        this.pos.y = (this.pos.y)+20; //Posición del disparo
        this.pos.x = (this.pos.x)+20; //Posición del disparo
        this.pos_inicial = this.pos.y;
        this.distancia = 0;
        //Switche para evitar disparar continuamente
        sw_bala = "on";
    },
  
            
    update: function(dt) {
        this.body.gravity = 0;
        //velocidad y posición del disparo
        this.body.vel.x = 15;
        //this.body.vel.y = 8; //para nueva habilidad
        
        //Determina la distancia
        this.distancia++;
        if(this.distancia == 20){
            me.game.world.removeChild(this);
            sw_bala = "";
            this.distancia = 0;
        }
        
        if(this.pos_inicial != this.pos.y){
            me.game.world.removeChild(this);
        }
        
        // update the body movement
        this.body.update(dt);
        // handle collisions against other shapes
        me.collision.check(this);
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])); 
        
    },
   
    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        //Muerte por balas
        if(other.name == "e_bat_lr" || other.name == "e_bat_ud"){ 
            //Quita vida del enemigo
            other.vida--;
            if(other.vida == "0"){
                //Enemigo Muerto
                other.alive = false;
                 me.game.world.removeChild(this);
            }
        }else{
            me.game.world.removeChild(this);
        }
        sw_bala = "";
        // Make all other objects solid
        return true;
    }
});

/*----------------
Balas a la izquierda
------------------------*/
game.LBulletEntity= me.Entity.extend({
    init: function (x, y, settings) {    
        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        //Define el tipo de entidad
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.ENEMY_OBJECT);
        // Add missing shape (melonJS 2.0.x) 
        if (this.body.shapes.length === 0) {
            this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        }
        
        this.pos.y = (this.pos.y)+20; //Posición del disparo (altura)
        this.pos.x = (this.pos.x)+20; //Posición del disparo (base)
        this.pos_inicial = this.pos.y;
        sw_bala = "on";
        this.distancia = 0;
    },
  
            
    update: function(dt) {
        this.body.gravity = 0;
        //Efecto espejo
        this.renderable.flipX(true);
        //velocidad y posición del disparo
        this.body.vel.x = -15;
        //this.body.vel.y = 8; //para nueva habilidad
        
        //Determina la distancia
        this.distancia++;
        if(this.distancia == 20){
            me.game.world.removeChild(this);
            sw_bala = "";
            this.distancia = 0;
        }
        
        if(this.pos_inicial != this.pos.y){
            me.game.world.removeChild(this);
        }
        
        // update the body movement
        this.body.update(dt);
        // handle collisions against other shapes
        me.collision.check(this);
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt])); 
    },
   
    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        //Muerte por balas
        if(other.name == "e_bat_lr" || other.name == "e_bat_ud"){ 
            //Quita vida del enemigo
            other.vida--;
            if(other.vida == "0"){
                //Enemigo Muerto
                other.alive = false;
                 me.game.world.removeChild(this);
            }
        }else{
            me.game.world.removeChild(this);
        }
        sw_bala = "";
        // Make all other objects solid
        return true;
    }
});
