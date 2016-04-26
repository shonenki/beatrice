/*----------------
Entidad de Puas
 ----------------- */
game.Puas = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "e_puas";

        //Espacio de desplazamiento (lo devuelve del Tile)
        var width = settings.width;
        var height = settings.height;
        //Tamaño del Sprite
        settings.spritewidth = 97;
        settings.spriteheight = 59;
        //Area de Influencia
        settings.width = 97;
        settings.height = 59;

        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        
        this.entidad = "enemigo";
        
        //Define el tipo de entidad
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.PLAYER_OBJECT);
        
        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.spritewidth
        this.pos.x  = x + width - settings.spritewidth;
        
        // manually update the entity bounds as we manually change the position
        this.updateBounds();
        
        //Ejecuta siempre el ciclo sin importar que esté fuera del área del personaje
        this.alwaysUpdate = true; 

        // to remember which side we were walking
        this.walkLeft = false;
        // camina y brinco (velocidad)
        this.body.setVelocity(2, 5);
        //Variables
        mueve_balsa = "";
        llega_balsa = "";
    },
    
    
    update : function (dt) {
        this.body.gravity = 0;
        if (this.walkLeft && this.pos.x <= this.startX) {
            this.walkLeft = false;
        } else if (!this.walkLeft && this.pos.x >= this.endX) {
            this.walkLeft = true;
        }
        
       //Condiciona según la distancia
       if(this.pos.x < 250){
           mueve_balsa = "";
           llega_balsa = "on";
       }
        
        // Mueve balsa
        if(mueve_balsa == "on"){
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
            // update the body movement
            this.body.update(dt);

            // handle collisions against other shapes
            me.collision.check(this);
        }
       
        
       
        
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }
           
    
});