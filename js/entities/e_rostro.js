/*----------------
Rostro
 ----------------- */
game.Rostro = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "e_rostro";

        //devuelve el tamaño del objeto desde el tile
        settings.width  = settings.width;
        settings.height = settings.height;

        //Tamaño del Sprite
        settings.spritewidth = 120;
        settings.spriteheight = 120;

        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        //Define el tipo de entidad
        this.body.collsionType = me.collision.types.WORLD_SHAPE;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
      
        this.renderable.addAnimation("moverse",  [0,1,2], 500);
        this.renderable.setCurrentAnimation("moverse"); //default
    },
    
    
    onCollision : function (response, other) {
       return false;
    }
           
    
});