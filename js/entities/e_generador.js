/* --------------------------
Generador Enemigos
------------------------ */
game.Generador = me.Entity.extend({
  init: function(x, y, settings) {
    //Define el tamaño del sprite y las características
    settings.image = "e_base";
    //Espacio de desplazamiento (lo devuelve del Tile)
    var width = settings.width;
    var height = settings.height;
    //Tamaño del Sprite
    settings.spritewidth = 41;
    settings.spriteheight = 41;
    //Area de Influencia
    settings.width = 41;
    settings.height = 41;
    this.cont = 0;
     
    //llama al constructor
    this._super(me.Entity, 'init', [x, y , settings]);
    this.alwaysUpdate = true; 
    
    //Define el tipo de entidad
    this.body.collisionType = me.collision.types.WORLD_SHAPE;
    //Condiciona con qué va a colisionar
    this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
    
  },
 
  // manage the enemy movement
  update: function(dt) {
        this.body.gravity = 0;
        var cont_fin = 250
        this.cont++;
        if(this.cont == cont_fin){
            //Selecciona tipo de enemigo de forma aleatoria
            var num = Math.floor((Math.random() * 2) + 1);
            if(num == 1){
                var entidad = new game.BatEntityLR(this.pos.x, this.pos.y, {image: 'e_bat', spritewidth: 65, spriteheight:50, width:65, height:50});
            }else{
                var entidad = new game.BatEntityLR(this.pos.x, this.pos.y, {image: 'e_bat', spritewidth: 65, spriteheight:50, width:65, height:50});
            }
            me.game.world.addChild(entidad, this.z);
            me.game.world.sort();
            this.cont = 0;
        }
       
  }
});