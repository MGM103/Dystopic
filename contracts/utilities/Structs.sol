/** 
 *  @fileOverview This file contains the structs or datatypes that are shared amongst contracts
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library dl {
    struct CharAttributes {
        uint256 strength;
        uint256 speed;
        uint256 fortitude;
        uint256 technical;
        uint256 instinct;
        uint256 dexterity;
        uint256 luck;
    }

    struct StrCharAttributes {
        string strength;
        string speed;
        string fortitude;
        string technical;
        string instinct;
        string dexterity;
        string luck;
    }

    struct Weapon {
        uint256 variantID;
        uint256 cost;
        uint256 damageMax;
        uint256 weight;
        uint256 damageType;
        uint256 damageMin;
        uint256 critChance;
        uint256 limit;
        string name;
        string description;
        string imageURI;
        bool limitedSupply;
    }

    struct BattleStats {
        uint256 meleeDmg;
        uint256 rangedDmg;
        uint256 health;
        uint256 speed;
        uint256 defence;
        uint256 crit;
        uint256 evasiveness;
        uint256 elementResist;
    }

    enum Architypes {
        ANY,
        CHIMERA,
        ANDROID,
        AI
    }
}