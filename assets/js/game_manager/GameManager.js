class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.chests = {};

    this.playerLocations = [];
    this.chestLocations = {};
    this.monsterLocations = {};
  }

  setup() {
    this.parseMapData();

    this.setupEventListener();
    this.setupSpawners();

    this.spawnPlayer();
  }

  parseMapData() {
    // parse map data from tiles
    this.mapData.forEach((layer) => {
      if (layer.name === 'player_locations') {
        // only care about the x y coords
        layer.objects.forEach((obj) => {
          this.playerLocations.push([obj.x, obj.y]);
        });
      } else if (layer.name === 'chest_locations') {
        layer.objects.forEach((obj) => {
          if (!this.chestLocations[obj.properties.spawner]) {
            this.chestLocations[obj.properties.spawner] = [];
          }
          this.chestLocations[obj.properties.spawner].push([obj.x, obj.y]);
        });
      } else if (layer.name === 'monster_locations') {
        layer.objects.forEach((obj) => {
          if (!this.monsterLocations[obj.properties.spawner]) {
            this.monsterLocations[obj.properties.spawner] = [];
          }
          this.monsterLocations[obj.properties.spawner].push([obj.x, obj.y]);
        });
      }
    });
  }

  setupEventListener() {
    // listen to chest pickup and spawn new chest
  }

  setupSpawners() {

  }

  spawnPlayer() {
    const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
    this.scene.events.emit('spawnPlayer', location);
  }
}
