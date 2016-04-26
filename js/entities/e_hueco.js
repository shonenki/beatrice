/*----------------
Colisión Hueco
 ----------------- */
game.Hueco = me.Entity.extend({
    init: function(x, y, settings) {
      // define this here instead of tiled
      settings.image = "e_hueco";

      //devuelve el tamaño del objeto desde el tile
      settings.width  = settings.width;
      settings.height = settings.height;

      //Tamaño del Sprite
      settings.spritewidth = 41;
      settings.spriteheight = 41;

      //llama al constructor
      this._super(me.Entity, 'init', [x, y , settings]);
      
      //Define el tipo de entidad
      this.body.collsionType = me.collision.types.WORLD_SHAPE;
      //Condiciona con qué va a colisionar
      this.body.setCollisionMask(me.collision.types.WORLD_SHAPE | me.collision.types.PLAYER_OBJECT);
    },
    
    
    onCollision : function (response, other) {
       return false;
    }
           
    
});