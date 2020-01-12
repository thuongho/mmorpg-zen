class Spawner {
  constructor(config, spawnLocations, addObject, deleteObject) {
    this.id = config.id;
    this.spawnInterval = config.spawnInterval;
    this.limit = config.limit;
    // use for both monster and chest
    this.objectType = config.spawnerType;
    this.spawnLocations = spawnLocations;
    this.addObject = addObject;
    this.deleteObject = deleteObject;

    // keep track of objects spawned
    this.objectsCreated = [];

    this.start();
  }

  start() {
    this.interval = setInterval(() => {
      if (this.objectsCreated.length < this.limit) {
        this.spawnObject();
      }
    }, this.spawnInterval);
  }

  spawnObject() {
    console.log('spawning object...');
    // create monster or chest
    if (this.objectType === 'CHEST') {
      this.spawnChest();
    }
  }

  spawnChest() {
    // pick random location
    const location = this.pickRandomLocation();
    const chest = new ChestModel(location[0], location[1], 10, this.id);
    this.objectsCreated.push(chest);
    // call addObject so that game manager can update object list
    this.addObject(chest.id, chest);
  }

  pickRandomLocation() {
    // pick random location for spawn objects
    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
    const invalidLocation = this.objectsCreated.some((obj) => {
      if (obj.x === location[0] && obj.y === location[1]) {
        return true;
      }
      return false;
    });

    if (invalidLocation) {
      return this.pickRandomLocation();
    }
    return location;
  }

  removeObject() {
    // clean up picked up objects
  }
}
