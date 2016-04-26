game.PlayScreen = me.ScreenObject.extend({
    // action to perform on state change
    onResetEvent: function() {
	// load a level
        me.levelDirector.loadLevel("area_inicio");
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function(){
        // Elimina elementos UHD
//        me.game.world.removeChild(this.HUD);
    }
});
