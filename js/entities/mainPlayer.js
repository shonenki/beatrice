/* --------------------------
Entidad de Jugador
------------------------ */
game.PlayerEntity = me.Entity.extend({

    init: function(x, y, settings) {
        //Define el tamaño del sprite y las características
        settings.image = "player";
        //Espacio de desplazamiento (lo devuelve del Tile)
        var width = settings.width;
        var height = settings.height;
        //Tamaño del Sprite
        settings.spritewidth = 60;
        settings.spriteheight = 60;
        //Area de Influencia
        settings.width = 30;
        settings.height = 60;
        
        //llama al constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        
        // create a font
        this.font = new me.BitmapFont("32x32_font", 24);
        this.font.set("left");
        this.Nivel = me.game.currentLevel.name;
        
        //Define entidad de colisión
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        
        //acciones por cuadro
        this.renderable.addAnimation("inicia",  [0]);
        this.renderable.addAnimation("estatico",  [0,0,0,1,1,1]);
        this.renderable.addAnimation("dispara",  [2]);
        this.renderable.addAnimation("caminar",  [3,4]);
        this.renderable.addAnimation("dispara_camina",  [5]);
        this.renderable.addAnimation("brincar",  [6]);
        this.renderable.addAnimation("dispara_brinca",  [7]);
        this.renderable.addAnimation("herido",  [0]);
        this.renderable.addAnimation("muere",  [8]);
        this.renderable.addAnimation("final_1",  [10,11], 200);
        this.renderable.addAnimation("final_2",  [12,13], 50);
        this.renderable.addAnimation("final_3",  [13,14], 200);
        this.renderable.addAnimation("final_4",  [14]);
        
        //Velocidad de desplazamiento y brinco
        if(this.Nivel != "area_esperanza"){
            this.body.setVelocity(4, 15);
        }else{
            this.body.setVelocity(8, 15);
        }

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
        
        //Objetos para mainplayer
        this.type = me.game.PLAYER_OBJECT;
        this.bloqueo_teclas = "";
        this.vida = 1;
        this.brinco = 0;
        //Variables de trabajo
        this.vista = "";
        this.contador = "";
        this.ultima_pos = "";
        this.sw_shoot = "";
        this.muerte_cont = "";
        this.sw_corre_dis = "";
        this.hueco_dead = "";
        this.cont_final = 0;
        this.cont_end = 0;
        sw_bala = "";
        cont_dead = 0;
    },
 
  /* -----
 
  update the player pos
 
  ------ */
  update: function(dt) {
    //Muerte del personaje
    if(this.vida < 0){
        //gravedad y velocidad en y en 0 por si muere en el aire
        this.body.gravity = 0;
        this.body.vel.y = 0; this.body.vel.x = 0;
        //descuenta las vidas
        this.muerte_cont++;
        if (!this.renderable.isCurrentAnimation("muere")){
            this.renderable.setCurrentAnimation("muere");
            me.audio.play("dead");
        }
        this.bloqueo_teclas = "on";
        new me.Tween(this.renderable)
            .to({
                "alpha" : 0
            }, 500)
            .onComplete((function () {
                me.game.world.removeChild(this);
                me.levelDirector.reloadLevel();
            }).bind(this))
            .start();     
    }
    
    
    if(this.bloqueo_teclas == ""){ 
        
        //Contador para cambio de sprite cuando dispara
        this.contador++; 
        if(this.contador == 10){ this.sw_shoot = ""; }
        
        //Movimiento del personaje (Condicinoes Normales)
        if(this.Nivel != "area_esperanza"){
            if ( (me.input.isKeyPressed('left')) && (this.bloqueo_teclas == "") ){ 
                //Efecto espejo
                this.renderable.flipX(true);
                //actualiza velocidad de manera incremental
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
                this.vista = "izquierda";
                //this.setFriction(0,0);
                if( (this.sw_shoot == "") && (this.body.vel.y == 0) ){
                    if (!this.renderable.isCurrentAnimation("caminar")){
                        this.renderable.setCurrentAnimation("caminar");
                    }
                } 
            }else{
                if ( (me.input.isKeyPressed('right')) && (this.bloqueo_teclas == "") ){
                    if(this.bloqueo_teclas == ""){
                        //actualiza velocidad de manera incremental
                        //Efecto espejo
                        this.renderable.flipX(false);
                        this.body.vel.x += this.body.accel.x * me.timer.tick;
                        this.vista = "derecha";
                        //this.setFriction(0,0);
                        if( (this.sw_shoot == "") && (this.body.vel.y == 0) ){
                            if (!this.renderable.isCurrentAnimation("caminar")){
                                this.renderable.setCurrentAnimation("caminar"); //Sprite de Caminar
                            }
                            this.sw_corre_dis = "";
                        }
                    }
                }else{
                    this.body.vel.x = 0;
                }
            } 
        }else{
            //Runner (Nivel Esperanza)
            this.renderable.flipX(true);
            //actualiza velocidad de manera incremental
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.vista = "izquierda";
            //this.setFriction(0,0);
            if( (this.sw_shoot == "") && (this.body.vel.y == 0) ){
                if (!this.renderable.isCurrentAnimation("caminar")){
                    this.renderable.setCurrentAnimation("caminar");
                }
            } 
        }

        
        //brincar
        if (me.input.isKeyPressed('jump')) {
            //Verifica que no esté brincando o cayendo
            if (!this.body.jumping && !this.body.falling) {
              this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
              //Flag de brinco
              this.body.jumping = true;
              this.renderable.setCurrentAnimation("brincar"); //Sprite de Brinco
            }
        }
       
    }
        
    //Dispara
    if (me.input.isKeyPressed('shoot') && this.bloqueo_teclas == "" && sw_bala == "") { 
        me.audio.play("shoot");
        this.sw_shoot = "on";
        this.contador = 0; 

        //si está brincando
        if(this.body.vel.y <= 0){ this.renderable.setCurrentAnimation("dispara_brinca"); }
        //si está estático
        if(this.body.vel.y == 0 && this.body.vel.x == 0){ this.renderable.setCurrentAnimation("dispara"); }
        //si está caminando
        if(this.body.vel.x > 0 || this.body.vel.x < 0 && me.input.isKeyPressed('dash') == false){ this.renderable.setCurrentAnimation("dispara_camina"); }
        //si está corriendo
        if(me.input.isKeyPressed('dash') == true){ this.renderable.setCurrentAnimation("dispara_corre"); this.sw_corre_dis = "on"; }
   
        if((this.vista == "derecha") || (this.vista == "")){shot = new game.RBulletEntity(this.pos.x, this.pos.y, {image: 'bullet', spritewidth: 19, spriteheight:9, width:19, height:9, name: "bullet"});}
        if((this.vista == "izquierda") || (me.input.isKeyPressed('left')) ){shot = new game.LBulletEntity(this.pos.x, this.pos.y, {image: 'bullet', spritewidth: 19, spriteheight:9, width:19, height:9, name: "bullet"});}
        if((this.vista == "izquierda") && (me.input.isKeyPressed('right'))){shot = new game.RBulletEntity(this.pos.x, this.pos.y, {image: 'bullet', spritewidth: 19, spriteheight:9, width:19, height:9, name: "bullet"});}
        me.game.world.addChild(shot, this.z);
        me.game.world.sort();
    } 
    
    
    //Estático
    if (this.body.vel.x == 0 && this.body.vel.y == 0 && this.sw_shoot == "" && this.bloqueo_teclas == "" ){
        if (!this.renderable.isCurrentAnimation("estatico")){
            this.renderable.setCurrentAnimation("estatico");
        }
    }

    if(this.hueco_dead == "on"){
        cont_dead++;
    }
    
        
    //Bloquea teclas y activa secuencia final
    if(localStorage.virtud_bondad == "on" && localStorage.virtud_esperanza == "on" && localStorage.virtud_paciencia == "on" && localStorage.virtud_paz == "on" && localStorage.virtud_final == "on" && me.game.currentLevel.name == "area01"){
        this.bloqueo_teclas = "on";
        this.cont_final++;
        localStorage.ending = "on";
        if(this.cont_final > 5 && this.cont_final < 250){ this.body.vel.y=0; this.body.vel.x=0; }
        if(this.cont_final > 50){
            if(this.cont_final < 250){
                if (!this.renderable.isCurrentAnimation("final_1")){
                    this.renderable.setCurrentAnimation("final_1");
                }
                //función para sacudir la pantalla
                me.game.viewport.shake(30,30);
//                //hace el fade blanco en la pantalla ^^y
//                me.game.viewport.fadeIn("#ffffff", 10);
            }else{
                if(this.cont_final == 251){
                    //Cambia audio por el enindg
                    me.audio.stopTrack(); 
                    me.audio.playTrack("ending");
                }
                if (!this.renderable.isCurrentAnimation("final_2")){
                    this.renderable.setCurrentAnimation("final_2");
                }
                this.body.vel.y = this.body.vel.y - 1 ;
                this.body.collisionType = "";
                if(this.body.vel.y < -9){
                    this.body.collisionType = me.collision.types.PLAYER_OBJECT;
                }
            }
        }
    }
    
    //Secuencia Final 2
    if(me.game.currentLevel.name == "area_ending"){
        this.bloqueo_teclas = "on";
        this.cont_end++;
        this.body.gravity = 0;
        if(this.cont_end < 250){
            this.body.collisionType = "";
            if (!this.renderable.isCurrentAnimation("final_2")){
                this.renderable.setCurrentAnimation("final_2");
            }
            if(this.cont_end < 245){
                this.pos.y = this.pos.y - 1;
            }
        }else{
            this.body.collisionType = me.collision.types.PLAYER_OBJECT;
            this.body.gravity = 9.8;
            if(this.cont_end < 320){
                if (!this.renderable.isCurrentAnimation("final_3")){
                    this.renderable.setCurrentAnimation("final_3");
                }
            }else{
                if (!this.renderable.isCurrentAnimation("final_4")){
                    this.renderable.setCurrentAnimation("final_4");
                }
            }
            
            
        }
    }
    // apply physics to the body (this moves the entity)
    this.body.update(dt);
 
    // handle collisions against other shapes
    me.collision.check(this);
 
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]));
    
    // create a font
    this.font = new me.BitmapFont("32x32_font", 32);
    this.font.set("right");
    
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
    onCollision : function (response, other) { 
        //Colisión con enemigos
        if(other.entidad == "enemigo" && other.alive == true){
            //Enemigo Común
            if(this.body.falling && this.body.vel.y > 1 && (other.name == "e_bat_lr" || other.name == "e_bat_ud") ){

                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // orden para rebotar sobre el enemigo
                this.body.jumping = true;

                //Quita vida a enemigo común
                other.vida--;
                if(other.vida == "0"){
                    //Enemigo Muerto
                    other.alive = false;
                }
            }else{
                //Recibe daño
                this.vida = this.vida -1;
            }
            //Importantísimo, evita que la colisión mande al personaje al "coño de la madre" (literalmente)
            return false;
            this.colisiona = "";
        }
        
        if(other.name == "e_balsa"){
            if(llega_balsa == ""){
                mueve_balsa = "on";
            }
        }
        
        //Evita que al recolectar la entidad la colisión afecte el aclance de un brinco
        if(other.name == "coinentity"){
            return false;
        }

        if(other.name == "e_hueco"){
            //me.game.world.removeChild(this);
            this.bloqueo_teclas = "on";
//            me.audio.stopTrack(); 
            this.hueco_dead = "on";
            this.body.vel.x = 0
            if(cont_dead == 1){ me.audio.play("dead"); }
            if(cont_dead == 100){ 
                me.levelDirector.reloadLevel();
                return false;
            }   
        }
        
        //Plataforma movible (horizontal)
        if(other.name == "e_plataforma" || other.name == "e_balsa"){ 
            if(this.pos.y < other.pos.y){
                if (this.renderable.isCurrentAnimation("estatico") ){
                    this.pos.x = other.pos.x - this.ultima_pos; 
                }
                this.ultima_pos = other.pos.x - this.pos.x;
            }
        }
      
       
        //Colisión con elementos bajo la condición "platform" en el tile
        if (other.type == "platform") {
            if (this.body.falling &&
                !me.input.isKeyPressed('down') &&
                // Shortest overlap would move the player upward
                (response.overlapV.y > 0) &&
                // The velocity is reasonably fast enough to have penetrated to the overlap depth
                (~~this.body.vel.y >= ~~response.overlapV.y)
            ) {
                // Disable collision on the x axis
                response.overlapV.x = 0;
                // Repond to the platform (it is solid)
                return true;
            }
            // Do not respond to the platform (pass through)
            return false;
        }
        
        //Desactiva los warps
        if(other.gotolevel == "area_bondad" && localStorage.virtud_bondad == "on"){ other.nextlevel = "area01"; }
        if(other.gotolevel == "area_esperanza" && localStorage.virtud_esperanza == "on"){ other.nextlevel = "area01"; }
        if(other.gotolevel == "area_paciencia" && localStorage.virtud_paciencia == "on"){ other.nextlevel = "area01"; }
        if(other.gotolevel == "area_paz" && localStorage.virtud_paz == "on"){ other.nextlevel = "area01"; }
        if(other.gotolevel == "area_final" && localStorage.virtud_final == "on"){ other.nextlevel = "area01"; }
        
    },
    draw : function (renderer) {
        if(me.game.currentLevel.name == "area_ending"){
            this.font.draw (renderer, "BEATRICE YOU ARE BACK...", this.pos.x-50, this.pos.y - 250);
            this.font.draw (renderer, "DO NOT LOSE YOURSELF AGAIN...", this.pos.x-50, this.pos.y - 200);
            this.font.draw (renderer, "KEEP YOUR VIRTUES...", this.pos.x-50, this.pos.y - 150);
            this.font.draw (renderer, "KEEP YOUR LIFE...", this.pos.x-50, this.pos.y - 100);
        }
        return this._super(me.Entity, "draw", [ renderer ]);
       
    }
});