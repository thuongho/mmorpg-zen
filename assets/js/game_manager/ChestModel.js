class ChestModel {
  constructor(x, y, gold, spawnerId) {
    this.id = `${spawnerId}-${uuid.v4()}`;
    // keep track which spawner this chest belongs to
    this.spawnerId = spawnerId;
    this.x = x;
    this.y = y;
    // how much gold this chest contains
    this.gold = gold;
  }
}
