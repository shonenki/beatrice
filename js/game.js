
/* Game namespace */
var game = {

    // an object where to store game information
//    data : {
//        // score
//        score : 0
//    },


    // Run on page load.
    "onload" : function () {
    // Initialize the video.
    //if (!me.video.init("screen",  me.video.CANVAS, window.innerWidth, window.innerHeight, false, 'auto')) {
    if (!me.video.init("screen", me.video.CANVAS, "800", "600", false)) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    //Permite debug con el render box
    window.onReady(function () {
        me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
    });


    // Initialize the audio.
    me.audio.init("ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
    
    //Caja para debug
//    me.debug.renderHitBox = true;
    
    //Centra la cámara
    me.game.viewport.setDeadzone(0,0)
   
    // inicia la música del stage
    me.audio.playTrack("DST-InertExponent"); 
    
    
},

    // Agrega al pool todas las funciones de los elementos del juego
    "loaded" : function () {
        // set the "Play/Ingame" Screen Object
//        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.transition("fade", "#000", 250);
        
        // register our player entity in the object pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("e_bala", game.RBulletEntity);
        me.pool.register("e_bala", game.LBulletEntity);
        me.pool.register("e_virtud", game.Virtudes);
        me.pool.register("e_bat_lr", game.BatEntityLR);
        me.pool.register("e_bat_ud", game.BatEntityUD);
        me.pool.register("e_altar", game.Altar);
        me.pool.register("e_altar_bondad", game.Altar_Bondad);
        me.pool.register("e_altar_esperanza", game.Altar_Esperanza);
        me.pool.register("e_altar_paz", game.Altar_Paz);
        me.pool.register("e_altar_paciencia", game.Altar_Paciencia);
        me.pool.register("e_altar_final", game.Altar_Final);
        me.pool.register("e_rostro", game.Rostro);
        me.pool.register("e_hueco", game.Hueco);
        me.pool.register("e_plataforma", game.Plataforma);
        me.pool.register("e_balsa", game.Balsa);
        me.pool.register("e_puas", game.Puas);
        //Generadores
        me.pool.register("e_generador", game.Generador);
        
        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.S, "jump", true);
        me.input.bindKey(me.input.KEY.D, "shoot",true);
        
        // start the game 
        me.state.change(me.state.PLAY);
        
        //Debug final
//        localStorage.virtud_bondad = "on"; 
//        localStorage.virtud_esperanza = "on";
//        localStorage.virtud_paz = "on";
//        localStorage.virtud_paciencia = "on";
//        localStorage.virtud_final = "on";
    }
};