class Map {
  constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
    // THE SCENE THIS MAP BELONGS TO
    this.scene = scene;
    // TILED JSON FILE KEY NAME
    this.key = key;
    // TILED TILESET IMAGE KEY NAME
    this.tileSetName = tileSetName;
    // NAME OF THE LAYER CREATED IN TILED FOR THE MAP BACKGROUND
    this.bgLayerName = bgLayerName;
    // NAME OF THE LAYER CREATED IN TILED FOR THE BLOCKED LAYERS
    this.blockedLayerName = blockedLayerName;

    this.createMap();
  }

  createMap() {
    // CREATE THE TILE MAP
    this.map = this.scene.make.tilemap({ key: this.key });

    // ADD THE TILESET IMAGE TO OUR MAP
    // params: has to match image in bootscene, key, size, margin, space
    this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);

    // CREATE OUR BACKGROUND
    // params: key, tiles, starting x, y
    this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
    // scale the layer to the size of player
    this.backgroundLayer.setScale(2);

    // CREATE BLOCK LAYER
    this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
    this.blockedLayer.setScale(2);
    // setCollisionByExclusion takes array of tile indexes that game objects can collide with
    // set array to -1 and phaser will check for collisions of all tiles in layer
    this.blockedLayer.setCollisionByExclusion([-1]);

    // UPDATE THE WORLD BOUNDS
    // default is bound of canvas
    this.scene.physics.world.bounds.width = this.map.widthInPixles * 2;
    this.scene.physics.world.bounds.height = this.map.heightInPixles * 2;

    // LIMIT CAMERA TO SIZE OF MAP
    // remove black area as phaser is infinite in each direction
    this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixles * 2, this.map.heightInPixles * 2);
  }
}