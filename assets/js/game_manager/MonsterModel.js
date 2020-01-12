class MonsterModel {
  constructor(x, y, gold, spawnerId, frame, health, attack) {
    this.id = `${spawnerId}-${uuid.v4()}`;
    // keep track which spawner this chest belongs to
    this.spawnerId = spawnerId;
    this.x = x;
    this.y = y;
    // gold monster drops
    this.gold = gold
    // spritesheet frame
    this.frame = frame;
    this.health = health;
    this.maxHealth = health;
    // monster dps
    this.attack = attack;
  }
}
