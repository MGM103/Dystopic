/** 
 *  @fileOverview This file is the maps the characters to their respective special abilities in the Dystopik game.
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../libraries/Structs.sol";

contract AbilitiesManifest {
    uint256 public constant totalAbilities = 4;

    function abilityToModifiers(uint256 abilityId) public pure returns(dl.BattleStats memory, uint256 duration) {
        require(abilityId >= 1 && abilityId <= totalAbilities, "Ability not found");

        if(abilityId == 1) {
            return armourUp();
        }else if(abilityId == 2) {
            return camo();
        }else if(abilityId == 3) {
            return rage();
        }else{
            return precision();
        }
    }

    function abilityToRequirements(uint256 abilityId) public pure returns(uint256, dl.Architypes, dl.CharAttributes memory){
        require(abilityId >= 1 && abilityId <= totalAbilities, "Ability not found");

        if(abilityId == 1) {
            return armourUpReqs();
        }else if(abilityId == 2) {
            return camoReqs();
        }else if(abilityId == 3) {
            return rageReqs();
        }else{
            return precisionReqs();
        }
    }

    function armourUp() internal pure returns(dl.BattleStats memory abilityModifiers, uint256 duration) {
        abilityModifiers.defence = 30;
        duration = 3;
    }

    function armourUpReqs() internal pure returns(uint256 level, dl.Architypes architype, dl.CharAttributes memory attrReqs){
        level = 1;
        architype = dl.Architypes.ANY;
        attrReqs.fortitude = 1;
    }

    function camo() internal pure returns(dl.BattleStats memory abilityModifiers, uint256 duration) {
        abilityModifiers.evasiveness = 50;
        duration = 2;
    }

    function camoReqs() internal pure returns(uint256 level, dl.Architypes architype, dl.CharAttributes memory attrReqs) {
        level = 1;
        architype = dl.Architypes.ANY;
        attrReqs.dexterity = 1;
    }

    function rage() internal pure returns(dl.BattleStats memory abilityModifiers, uint256 duration) {
        abilityModifiers.meleeDmg = 20;
        abilityModifiers.rangedDmg = 20;
        abilityModifiers.crit = 10;
        duration = 2;
    }

    function rageReqs() internal pure returns(uint256 level, dl.Architypes architype, dl.CharAttributes memory attrReqs) {
        level = 1;
        architype = dl.Architypes.ANY;
        attrReqs.strength = 1;
    }

    function precision() internal pure returns(dl.BattleStats memory abilityModifiers, uint256 duration) {
        abilityModifiers.crit = 100;
        duration = 1;
    }

    function precisionReqs() internal pure returns(uint256 level, dl.Architypes architype, dl.CharAttributes memory attrReqs) {
        level = 1;
        architype = dl.Architypes.ANDROID;
        attrReqs.technical = 1;
        attrReqs.luck = 1;
        attrReqs.dexterity = 1;
    }
}