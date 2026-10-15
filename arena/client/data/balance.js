var ZONES = ["голова", "грудь", "живот", "пояс", "ноги"];
var STAT_KEYS = ["str", "agi", "intu", "end"];
var STAT_NAMES = { str: "Сила", agi: "Ловкость", intu: "Интуиция", end: "Выносливость" };
var SLOTS = ["weapon", "shield", "head", "earring", "amulet", "ring1", "ring2", "chest", "belt", "legs", "wrists", "bracers", "greaves"];
var SLOT_NAMES = { weapon: "⚔ Оружие", shield: "🛡 Щит", head: "🪖 Шлем", earring: "👂 Серьги", amulet: "📿 Амулет", ring1: "💍 Кольцо 1", ring2: "💍 Кольцо 2", chest: "🛡 Нагрудник", belt: "🪢 Пояс", legs: "👢 Обувь", wrists: "🥊 Рукавицы", bracers: "🥊 Наручи", greaves: "🦿 Поножи" };
var SLOT_EMOJI = { weapon: "⚔", shield: "🛡", head: "🪖", earring: "👂", amulet: "📿", ring1: "💍", ring2: "💍", chest: "🦺", belt: "🪢", legs: "👢", wrists: "🥊", bracers: "🥊", greaves: "🦿" };
var MAX_LEVEL = 13;
var FREE_RESETS = 5;
var DUEL_MIN_LEVEL = 0;
var DUEL_REWARD_MULT = 1.5;
var ENEMY_STAT_MULT = 1.0;
var DUEL_STAT_MULT = 1.3;
var TURN_TIMEOUT = 180000; /* 3 минуты на ход */

  var XP_TABLE = [
  [0, 100, 200, 350],
  [500, 1500, 2600, 3900, 5300],
  [6500, 7600, 8850, 10300, 11400, 12750],
  [14500, 18000, 22700, 27400, 32000, 35500],
  [42500, 46000, 50700, 55400, 60000, 63500],
  [70500, 110500, 150500, 190500, 230500, 270500, 310500, 350500],
  [370500, 396200, 421900, 447600, 481900, 516200, 550500, 619100],
  [670500, 803500, 870500, 1203500, 1314500, 1425500, 1536500, 1647500, 1692500, 1781500],
  [1870500, 1990500, 2110500, 2230500, 2350500, 2470500, 2590500, 2710500, 2830500, 2950500],
  [3070500, 5130500, 5470500, 6160500, 6850500, 7190500, 7360500, 7530500, 7700500, 7800500],
  [7870500, 8270500, 8670500, 9070500, 9470500, 9870500, 10270500, 10670500, 11070500, 11470500, 11870500, 12270500],
  [12670500, 15070500, 17470500, 19870500, 22270500, 24670500, 27070500, 29470500, 31870500, 34270500],
  [36670500, 39670500, 42670500, 45670500, 48670500, 51670500, 54670500, 57670500],
  [60670500]
];

var AP_REWARDS = [
  [0, 1, 1, 1],
  [3, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [5, 1, 1, 1, 1, 1],
  [3, 1, 1, 1, 1, 1, 1, 1],
  [3, 1, 1, 1, 1, 1, 1, 1],
  [5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [7, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15],
  [20, 5, 5, 5, 5, 5, 5, 5, 5],
  [0]
];

var XP_PER_BOT = [10, 10, 10, 20, 20, 50, 50, 100, 100, 200, 200, 500, 500];

var HP_REGEN_INTERVAL = 10000;
var HP_REGEN_PERCENT = 0.01;
var FATIGUE_PER_FIGHT = 1;
var FATIGUE_MAX = 100;
var FATIGUE_RECOVER_INTERVAL = 60000;
var FATIGUE_LEVELS = [
  { min: 0, max: 49, name: "Свежий", emoji: "🟢", expMult: 1.0, goldMult: 1.0, dmgMult: 1.0, dodgeMult: 1.0 },
  { min: 50, max: 79, name: "Усталый", emoji: "🟡", expMult: 0.8, goldMult: 0.8, dmgMult: 0.9, dodgeMult: 0.95 },
  { min: 80, max: 100, name: "Измотанный", emoji: "🔴", expMult: 0.5, goldMult: 0.5, dmgMult: 0.8, dodgeMult: 0.9 }
];
var UPGRADE_DATA = [
  { lv: 1, cost: 50, chance: 100, mult: 0.10 },
  { lv: 2, cost: 150, chance: 100, mult: 0.25 },
  { lv: 3, cost: 400, chance: 100, mult: 0.50 },
  { lv: 4, cost: 1000, chance: 30, mult: 0.80 },
  { lv: 5, cost: 2500, chance: 10, mult: 1.20 }
];
var PROTECT_BONUS = 30;
var DUR_REPAIR_COEFF = 0.6;
var T1_DROP_CHANCE = 0.17;
var T2_DROP_CHANCE = 0.08;
/* === ЭЛИТНЫЕ ВРАГИ === */
var ELITE_CHANCE = 0.10;         /* 10% шанс, что враг элитный */
var ELITE_HP_MULT = 1.5;         /* HP × 1.5 */
var ELITE_DMG_MULT = 1.2;        /* урон × 1.2 */
var ELITE_GOLD_MULT = 1.5;       /* золото × 1.5 */
var ELITE_XP_MULT = 1.5;         /* опыт × 1.5 */
var ELITE_ITEM_DROP = 0.25;      /* 25% шанс на предмет */
var ELITE_T2_CHANCE = 0.50;      /* 50% шанс на T2 (если локация позволяет) */
var CRAFT_RECIPES = [
  { lv: 1, t1: 25, t2: 0, t3: 0, cost: 20, mult: 0.10 },
  { lv: 2, t1: 25, t2: 10, t3: 0, cost: 50, mult: 0.25 },
  { lv: 3, t1: 0, t2: 25, t3: 5, cost: 150, mult: 0.50 }
];
var WEAPON_WEAR_CHANCE = 0.1;
var ARMOR_WEAR_CHANCE = 0.15;
var SHIELD_WEAR_CHANCE = 0.17;

var SKILLS = {
  crit: [
    { id: "crit_1", name: "Смертельный удар", icon: "💀", minC: 3, maxC: 6, desc: "Гарантированный крит ×3.0" },
    { id: "crit_2", name: "Пронзание", icon: "🗡️", minC: 2, maxC: 4, desc: "Игнорирует блок" },
    { id: "crit_3", name: "Двойной удар", icon: "⚔️", minC: 4, maxC: 7, desc: "2 удара ×0.7" }
  ],
  dodge: [
    { id: "dodge_1", name: "Рывок", icon: "💨", minC: 2, maxC: 5, desc: "90% уворот + бонус урона" },
    { id: "dodge_2", name: "Серия", icon: "🌀", minC: 3, maxC: 6, desc: "+30% урона к следующему удару" },
    { id: "dodge_3", name: "Тень", icon: "👤", minC: 4, maxC: 7, desc: "+10% уворота на 2 хода" }
  ],
  tank: [
    { id: "tank_1", name: "Железная стена", icon: "🛡️", minC: 3, maxC: 5, desc: "100% блок на 1 ход" },
    { id: "tank_2", name: "Удар щитом", icon: "🔨", minC: 5, maxC: 8, desc: "Урон + оглушение" },
    { id: "tank_3", name: "Регенерация", icon: "💚", minC: 4, maxC: 7, desc: "+10% макс. HP" }
  ]
};

var ENEMY_NAMES = ["Пьяный наёмник", "Бродячий боец", "Ветеран арены", "Боец в кожаной броне", "Загадочный странник", "Солдат гильдии", "Изгнанник"];
var ENEMY_AGES = { "Пьяный наёмник": 34, "Бродячий боец": 28, "Ветеран арены": 45, "Боец в кожаной броне": 31, "Загадочный странник": 40, "Солдат гильдии": 27, "Изгнанник": 38 };
var ENEMY_GENDERS = { "Пьяный наёмник": "М", "Бродячий боец": "М", "Ветеран арены": "М", "Боец в кожаной броне": "Ж", "Загадочный странник": "М", "Солдат гильдии": "Ж", "Изгнанник": "М" };
var LOCATIONS = [
  { id: "arena", name: "🏟️ Арена", minLevel: 0, statMult: 1.0, enemies: ["Пьяный наёмник","Бродячий боец","Ветеран арены","Боец в кожаной броне","Загадочный странник","Солдат гильдии","Изгнанник"] },
  { id: "forest", name: "🌲 Лес", minLevel: 0, statMult: 0.8, enemies: ["Дикий волк","Кабан-секач","Лесной медведь","Рысь","Одичавший пёс"] },
  { id: "caves", name: "🕳️ Пещеры", minLevel: 3, statMult: 1.1, enemies: ["Пещерный паук","Летучая мышь-вампир","Пещерный тролль","Слепой краб"] },
  { id: "graveyard", name: "💀 Кладбище", minLevel: 6, statMult: 1.2, enemies: ["Скелет-воин","Зомби","Призрак","Костяной маг"] },
  { id: "castle", name: "🏰 Замок Короля", minLevel: 3, statMult: 1.4, enemies: [], isBoss: true },
  { id: "office", name: "🏢 Кабинет Директора", minLevel: 2, statMult: 1.4, enemies: [], isBoss: true }
];
var ELITE_NAMES = {
  forest:    ["Лесной медведь-вожак", "Вожак стаи", "Древень", "Проклятая рысь"],
  caves:     ["Матка пещерных пауков", "Древний тролль", "Король пещер", "Слепой ужас"],
  graveyard: ["Лич-некромант", "Древний скелет-воин", "Призрак-полководец", "Костяной лорд"]
};
var currentLocation = "arena";

/* === БОССЫ ===
   Ключ — id локации. Один босс = одна локация. */
var BOSS_CONFIGS = {
  castle: {
    location: "castle",
    name: "👑 Король Замка",
    levelMult: 1.3,
    cooldownMs: 4 * 3600 * 1000,
    t3DropChance: 0.15,
    rewardMoney: 15
  },
  office: {
    location: "office",
    name: "👑 Директор",
    levelMult: 1.3,
    cooldownMs: 4 * 3600 * 1000,
    t3DropChance: 0.15,
    rewardMoney: 15
  }
};

function getBossConfig(locId) {
  return BOSS_CONFIGS[locId] || null;
}

var ARCHETYPE_PREFERRED_STAT = {
  fighter: "str",
  tank:    "end",
  dodger:  "agi",
  crit:    "intu"
};

var ARCHETYPE_WEAPON_TYPES = {
  fighter: ["swords", "axes"],
  tank:    ["clubs"],
  dodger:  ["knives"],
  crit:    ["swords", "knives"]
};

/* === АРХЕТИПЫ ВРАГОВ ===
   Суммарный бюджет статов = бюджету игрока (× loc.statMult).
   Веса определяют, во что вкладывается враг. */
var ENEMY_ARCHETYPES = [
  { id: "fighter", name: "Боец",     weights: { str: 0.45, agi: 0.15, intu: 0.15, end: 0.25 } },
  { id: "tank",    name: "Танк",     weights: { str: 0.20, agi: 0.10, intu: 0.10, end: 0.60 } },
  { id: "dodger",  name: "Ловкач",   weights: { str: 0.15, agi: 0.50, intu: 0.15, end: 0.20 } },
  { id: "crit",    name: "Критовик", weights: { str: 0.15, agi: 0.15, intu: 0.50, end: 0.20 } }
];
function pickArchetype() {
  return ENEMY_ARCHETYPES[Math.floor(Math.random() * ENEMY_ARCHETYPES.length)];
}

function allocStats(total, weights) {
  var out = {};
  ["str", "agi", "intu", "end"].forEach(function(k) {
    var jitter = 0.85 + Math.random() * 0.30;   // ±15% разброс
    out[k] = Math.max(1, Math.round(total * weights[k] * jitter));
  });
  return out;
}

var QUEST_TABLE = [
  { id: "q_kill1", name: "Первая кровь", desc: "Победи 1 противника.", type: "kills", target: 1, rewardMoney: 15, rewardPct: 10 },
  { id: "q_kill10", name: "Воин арены", desc: "Победи 10 противников.", type: "kills", target: 10, rewardMoney: 50, rewardPct: 10 },
  { id: "q_kill50", name: "Ветеран боёв", desc: "Победи 50 противников.", type: "kills", target: 50, rewardMoney: 200, rewardPct: 12 },
  { id: "q_kill200", name: "Гроза арены", desc: "Победи 200 противников.", type: "kills", target: 200, rewardMoney: 1500, rewardPct: 15 },
  { id: "q_kill1000", name: "Истребитель", desc: "Победи 1 000 противников.", type: "kills", target: 1000, rewardMoney: 2500, rewardPct: 15 },
  { id: "q_lvl2", name: "Новичок окреп", desc: "Достигни 2-го уровня.", type: "level", target: 2, rewardMoney: 30, rewardPct: 10 },
  { id: "q_lvl5", name: "Опытный боец", desc: "Достигни 5-го уровня.", type: "level", target: 5, rewardMoney: 100, rewardPct: 10 },
  { id: "q_lvl10", name: "Мастер клинка", desc: "Достигни 10-го уровня.", type: "level", target: 10, rewardMoney: 2000, rewardPct: 12 },
  { id: "q_lvl13", name: "Легенда арены", desc: "Достигни 13-го уровня (MAX!).", type: "level", target: 13, rewardMoney: 20000, rewardPct: 0 },
  { id: "q_buy3", name: "Коллекционер", desc: "Купи 3 предмета.", type: "buys", target: 3, rewardMoney: 40, rewardPct: 10 },
  { id: "q_equip3", name: "Снаряжённый воин", desc: "Надень снаряжение в 3 слота.", type: "equipped", target: 3, rewardMoney: 60, rewardPct: 10 },
  { id: "q_forest20", name: "Охотник на волков", desc: "Победи 20 противников в Лесу.", type: "locationKills", location: "forest", target: 20, rewardMoney: 80, rewardPct: 8 },
  { id: "q_caves15", name: "Покоритель пещер", desc: "Победи 15 противников в Пещерах.", type: "locationKills", location: "caves", target: 15, rewardMoney: 150, rewardPct: 10 },
  { id: "q_graveyard10", name: "Охотник на нежить", desc: "Победи 10 противников на Кладбище.", type: "locationKills", location: "graveyard", target: 10, rewardMoney: 300, rewardPct: 10 }
];

var DAILY_QUESTS_POOL = [
  { id: "d_kill10", name: "Утренняя разминка", desc: "Победи 10 противников за день.", target: 10, rewardMoney: 70, rewardPct: 5 },
  { id: "d_kill25", name: "Активный день", desc: "Победи 25 противников за день.", target: 25, rewardMoney: 100, rewardPct: 5 },
  { id: "d_kill50", name: "Марафон бойца", desc: "Победи 50 противников за день.", target: 50, rewardMoney: 200, rewardPct: 5 },
  { id: "d_noLose10", name: "Без поражений", desc: "Победи 10 раз подряд.", target: 10, rewardMoney: 150, rewardPct: 5 },
  { id: "d_block20", name: "Защитник", desc: "Заблокируй 20 ударов за день.", target: 20, rewardMoney: 120, rewardPct: 5 },
  { id: "d_dodge15", name: "Неуловимый", desc: "Уклонись от 15 ударов за день.", target: 15, rewardMoney: 120, rewardPct: 5 },
  { id: "d_duel3", name: "Дуэлянт", desc: "Победи в 3 дуэлях за день.", target: 3, rewardMoney: 150, rewardPct: 5 },
  { id: "d_upgrade1", name: "Мастер заточки", desc: "Заточи 1 предмет (любой результат).", target: 1, rewardMoney: 100, rewardPct: 5 },
  { id: "d_work1", name: "Трудяга", desc: "Заверши 1 рабочую смену.", target: 1, rewardMoney: 80, rewardPct: 5 },
  { id: "d_buy1", name: "Покупатель", desc: "Купи 1 предмет в магазине.", target: 1, rewardMoney: 60, rewardPct: 5 },
  { id: "d_crit10", name: "Мастер крита", desc: "Нанеси 10 критических ударов за день.", target: 10, rewardMoney: 130, rewardPct: 5 },
  { id: "d_heal3", name: "Целитель", desc: "Вылечись 3 раза за день (зельем или у доктора).", target: 3, rewardMoney: 90, rewardPct: 5 }
];