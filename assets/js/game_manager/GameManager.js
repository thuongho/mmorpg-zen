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
    console.log('this.mapData', this.mapData);
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
    // create chest spawners
    Object.keys(this.chestLocations).forEach((key) => {
      const config = {
        spawnInterval: 3000,
        limit: 3,
        spawnerType: 'CHEST',
        id: `chest-${key}`
      };

      const spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this)
      );

      // add spawner to spawner object
      this.spawners[spawner.id] = spawner;
    });
  }

  spawnPlayer() {
    const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
    this.scene.events.emit('spawnPlayer', location);
  }

  addChest(id, chest) {
    this.chests[id] = chest;
    console.log('chest', chest);
  }

  deleteChest() {}
}
