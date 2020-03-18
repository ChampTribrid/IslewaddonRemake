window.spells = {
    'magic missile': {
        statType: 'int',
        spellType : 'Arcane Spell',
        random: {
            damage: [4, 15]
        }
    },
    'ice spear': {
        statType: 'int',
        spellType : 'Frost Spell',
        random: {
            damage: [2, 8],
            i_freezeDuration: [6, 10]
        }
    },
    fireblast: {
        statType: 'int',
        spellType : 'Fire Spell',
        random: {
            damage: [2, 5],
            i_radius: [1, 2],
            i_pushback: [2, 5]
        }
    },
    smite: {
        statType: 'int',
        spellType : 'Holy Spell',
        random: {
            damage: [4, 14],
            i_stunDuration: [6, 10]
        }
    },
    consecrate: {
        statType: 'int',
        spellType : 'Holy Spell',
        random: {
            healing: [0.3, 0.5],
            i_duration: [7, 13]
        }
    },

    slash: {
        statType: 'str',
        spellType : 'Physical Attack',
        random: {
            damage: [6, 23]
        }
    },
    charge: {
        statType: 'str',
        spellType : 'Physical Attack',
        random: {
            damage: [2, 8],
            i_stunDuration: [6, 10]
        }
    },
    flurry: {
        statType: 'none',
        spellType : 'none',
        random: {
            i_duration: [4, 9]
        }
    },
    smokebomb: {
        statType: 'dex',
        spellType : 'Poison Attack',
        random: {
            damage: [0.25, 1.45],
            i_radius: [1, 3],
            i_duration: [7, 13]
        }
    },
    'crystal spikes': {
        statType: ['dex', 'int'],
        spellType : 'Spell',
        random: {
            damage: [3, 14],
            i_delay: [4, 1]   // Real value [1, 4]
        },
        negativeStats: [
            'i_delay'
        ]
    },
    innervation: {
        statType: 'none',
        spellType : 'Aura Buff',
        random: {
            regenPercentage: [0.3, 1.5]
        }
    },
    tranquility: {
        statType: 'none',
        spellType : 'Aura Buff',
        random: {
            regenPercentage: [4, 10]
        }
    },
    swiftness: {
        statType: 'none',
        spellType : 'Aura Buff',
        random: {
            chance: [5, 10]
        }
    },

    'harvest life': {
        statType: ['str', 'int'],
        spellType : 'Physical Attack',
        random: {
            damage: [4, 14],
            healPercent: [10, 30]
        }
    },

    'summon skeleton': {
        statType: ['str', 'int'],
        spellType : 'Spell',
        random: {
            damagePercent: [20, 76],
            hpPercent: [40, 60]
        }
    },

     'blood barrier': {
         statType: ['str', 'int'],
         spellType : 'Spell',
         random: {
             i_drainPercentage: [10, 50],
             shieldMultiplier: [2, 5],
             i_frenzyDuration: [5, 15]
         }
    }
};
