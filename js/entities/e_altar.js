/*----------------
Altar
 ----------------- */
game.Altar = me.Entity.extend({
    init: function(x, y, settings) {
      // define this here instead of tiled
      settings.image = "e_altar";

      //devuelve el tamaño del objeto desde el tile
      settings.width  = settings.width;
      settings.height = settings.height;

      //Tamaño del Sprite
      settings.spritewidth = 240;
      settings.spriteheight = 240;

      //llama al constructor
      this._super(me.Entity, 'init', [x, y , settings]);
      
      //Define el tipo de entidad
      this.body.collsionType = me.collision.types.WORLD_SHAPE;
      //Condiciona con qué va a colisionar
      this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
    },
    
    
    onCollision : function (response, other) {
       return false;
    }
           
    
});

/*----------------
Altar Bondad
 ----------------- */
game.Altar_Bondad = me.Entity.extend({
    init: function(x, y, settings) {
        
        //Condiciona para "desaparecer" figura
        if(localStorage.virtud_bondad == "on"){ 
            settings.image = "e_altar_bondad";
            settings.spritewidth = 140;
            settings.spriteheight = 140;
        }else{
            settings.image = "e_base";
            settings.spritewidth = 41;
            settings.spriteheight = 41;
        }
        
        //devuelve el tamaño del objeto desde el tile
        settings.width  = settings.width;
        settings.height = settings.height;

        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        //Define el tipo de entidad
        this.body.collsionType = me.collision.types.WORLD_SHAPE;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
    },
    onCollision : function (response, other) {
       return false;
    }
});

/*----------------
Altar Esperanza
 ----------------- */
game.Altar_Esperanza = me.Entity.extend({
    init: function(x, y, settings) {
        
        //Condiciona para "desaparecer" figura
        if(localStorage.virtud_esperanza == "on"){ 
            settings.image = "e_altar_esperanza";
            settings.spritewidth = 140;
            settings.spriteheight = 140;
        }else{
            settings.image = "e_base";
            settings.spritewidth = 41;
            settings.spriteheight = 41;
        }
        
        //devuelve el tamaño del objeto desde el tile
        settings.width  = settings.width;
        settings.height = settings.height;

        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        //Define el tipo de entidad
        this.body.collsionType = me.collision.types.WORLD_SHAPE;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
    },
    onCollision : function (response, other) {
       return false;
    }
});

/*----------------
Altar Paz
 ----------------- */
game.Altar_Paz = me.Entity.extend({
    init: function(x, y, settings) {
        
        //Condiciona para "desaparecer" figura
        if(localStorage.virtud_paz == "on"){ 
            settings.image = "e_altar_paz";
            settings.spritewidth = 140;
            settings.spriteheight = 140;
        }else{
            settings.image = "e_base";
            settings.spritewidth = 41;
            settings.spriteheight = 41;
        }
        
        //devuelve el tamaño del objeto desde el tile
        settings.width  = settings.width;
        settings.height = settings.height;

        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        //Define el tipo de entidad
        this.body.collsionType = me.collision.types.WORLD_SHAPE;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
    },
    onCollision : function (response, other) {
       return false;
    }
});

/*----------------
Altar Paciencia
 ----------------- */
game.Altar_Paciencia = me.Entity.extend({
    init: function(x, y, settings) {
        
        //Condiciona para "desaparecer" figura
        if(localStorage.virtud_paciencia == "on"){ 
            settings.image = "e_altar_paciencia";
            settings.spritewidth = 140;
            settings.spriteheight = 140;
        }else{
            settings.image = "e_base";
            settings.spritewidth = 41;
            settings.spriteheight = 41;
        }
        
        //devuelve el tamaño del objeto desde el tile
        settings.width  = settings.width;
        settings.height = settings.height;

        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        //Define el tipo de entidad
        this.body.collsionType = me.collision.types.WORLD_SHAPE;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
    },
    onCollision : function (response, other) {
       return false;
    }
});

/*----------------
Altar Final
 ----------------- */
game.Altar_Final = me.Entity.extend({
    init: function(x, y, settings) {
        
        //Condiciona para "desaparecer" figura
        if(localStorage.virtud_final == "on"){ 
            settings.image = "e_altar_final";
            settings.spritewidth = 140;
            settings.spriteheight = 140;
        }else{
            settings.image = "e_base";
            settings.spritewidth = 41;
            settings.spriteheight = 41;
        }
        
        //devuelve el tamaño del objeto desde el tile
        settings.width  = settings.width;
        settings.height = settings.height;

        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        //Define el tipo de entidad
        this.body.collsionType = me.collision.types.WORLD_SHAPE;
        //Condiciona con qué va a colisionar
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
    },
    onCollision : function (response, other) {
       return false;
    }
});