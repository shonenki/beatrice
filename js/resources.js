game.resources = [
// Pantalla Inicial
    {name: "title_screen",  type:"image", src: "data/img/gui/title_screen.png"},
    
// Tiles del nivel
    {name: "tiles",  type:"image", src: "data/img/map/tiles.png"},

// Personaje principal
    {name: "player",              type:"image", src: "data/img/sprite/player.png"},
    {name: "bullet",              type:"image", src: "data/img/sprite/bullet.png"},

//Runas - Virtudes
    {name: "runa_bondad",         type:"image", src: "data/img/sprite/runa_bondad.png"},
    {name: "runa_esperanza",      type:"image", src: "data/img/sprite/runa_esperanza.png"},
    {name: "runa_paz",            type:"image", src: "data/img/sprite/runa_paz.png"},
    {name: "runa_paciencia",      type:"image", src: "data/img/sprite/runa_paciencia.png"},
    {name: "runa_final",          type:"image", src: "data/img/sprite/runa_final.png"},
    
//Enemigos
    {name: "e_bat",               type:"image", src: "data/img/sprite/bat.png"},
    {name: "e_ghost",             type:"image", src: "data/img/sprite/ghost.png"},
    {name: "e_vamp",              type:"image", src: "data/img/sprite/vamp.png"},
    {name: "e_zombie",            type:"image", src: "data/img/sprite/zombie.png"},
    
//Entorno Stage
    {name: "e_altar",             type:"image", src: "data/img/sprite/altar.png"},
    {name: "e_altar_bondad",      type:"image", src: "data/img/sprite/altar_bondad.png"},
    {name: "e_altar_esperanza",   type:"image", src: "data/img/sprite/altar_esperanza.png"},
    {name: "e_altar_paz",         type:"image", src: "data/img/sprite/altar_paz.png"},
    {name: "e_altar_paciencia",   type:"image", src: "data/img/sprite/altar_paciencia.png"},
    {name: "e_altar_final",       type:"image", src: "data/img/sprite/altar_final.png"},
    {name: "e_rostro",            type:"image", src: "data/img/sprite/rostro.png"},
    {name: "e_hueco",             type:"image", src: "data/img/sprite/base.png"},
    {name: "e_plataforma",        type:"image", src: "data/img/sprite/plataforma.png"},
    {name: "e_balsa",             type:"image", src: "data/img/sprite/balsa.png"},
    {name: "e_puas",              type:"image", src: "data/img/sprite/puas.png"},
    {name: "e_base",              type:"image", src: "data/img/sprite/base.png"},
    
//Fuente TXT
    {name: "32x32_font",          type:"image", src: "data/img/font/32x32_font.png"},
    
//Mapas
    {name: "area_inicio",         type: "tmx",  src: "data/map/area_inicio.tmx"},
    {name: "area01",              type: "tmx",  src: "data/map/area01.tmx"},
    {name: "area_paz",            type: "tmx",  src: "data/map/area_paz.tmx"},
    {name: "area_paciencia",      type: "tmx",  src: "data/map/area_paciencia.tmx"},
    {name: "area_bondad",         type: "tmx",  src: "data/map/area_bondad.tmx"},
    {name: "area_esperanza",      type: "tmx",  src: "data/map/area_esperanza.tmx"},
    {name: "area_final",          type: "tmx",  src: "data/map/area_final.tmx"},
    {name: "area_ending",         type: "tmx",  src: "data/map/area_ending.tmx"},
  
   /* 
  * Background music. 
  */
  {name: "dst-inertexponent", type: "audio", src: "data/bgm/"},
  {name: "ending", type: "audio", src: "data/bgm/"},
   
  /* 
  * Sound effects. 
  */
  {name: "shoot", type: "audio", src: "data/sfx/"},
  {name: "dead",  type: "audio", src: "data/sfx/"},
  {name: "recolecta",  type: "audio", src: "data/sfx/"},

    /* Graphics.
     * @example
     * {name: "example", type:"image", src: "data/img/example.png"},
     */

    /* Texture Atlases
     * @example
     * {name: "texture", type: "json", src: "data/img/example_tps.json"},
     */

    /* Maps.
     * @example
     * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
     * {name: "example01", type: "tmx", src: "data/map/example01.json"},
      */

    /* Background music.
     * @example
     * {name: "example_bgm", type: "audio", src: "data/bgm/"},
     */

    /* Sound effects.
     * @example
     * {name: "example_sfx", type: "audio", src: "data/sfx/"}
     */
];
