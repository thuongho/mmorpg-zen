class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.chests = {};
    this.monsters = {};

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
    this.scene.events.on('pickUpChest', (chestId) => {
      // update the spawner
      if (this.chests[chestId]) {
        // check if chest is still in chests, then remove chestId
        this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
      }
    });
  }

  setupSpawners() {
    const config = {
      spawnInterval: 3000,
      limit: 3,
      spawnerType: SpawnerType.CHEST,
      id: ''
    };
    let spawner;

    // create chest spawners
    Object.keys(this.chestLocations).forEach((key) => {
      config.id = `chest-${key}`;

      spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this)
      );

      // add spawner to spawner object
      this.spawners[spawner.id] = spawner;
    });

    // create monster spawner
    Object.keys(this.monsterLocations).forEach((key) => {
      config.spawnerType = SpawnerType.MONSTER;
      config.id =`monster-${key}`;

      spawner = new Spawner(
        config,
        this.monsterLocations[key],
        this.addMonster.bind(this),
        this.deleteMonster.bind(this)
      );

      this.spawners[spawner.id] = spawner;
    });
  }

  spawnPlayer() {
    const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
    this.scene.events.emit('spawnPlayer', location);
  }

  addChest(chestId, chest) {
    this.chests[chestId] = chest;
    // emit so that game scene is notified
    this.scene.events.emit('chestSpawned', chest);
  }

  deleteChest(chestId) {
    delete this.chests[chestId];
  }

  addMonster(monsterId, monster) {
    this.monsters[monsterId] = monster;
    this.scene.events.emit('monsterSpawned', monster);
  }

  deleteMonster(monsterId) {
    delete this.monsters[monsterId];
  }
}
