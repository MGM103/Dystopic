/** 
 *  @fileOverview This contract contains all of the data regarding enemies that will be fought in quests
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../libraries/Structs.sol";

contract EnemyManifest {
    uint256 public constant totalEnemyVariants = 2;

    function enemyIdToEnemyStats(uint256 _enemyId) public pure returns(dl.BattleStats memory enemyStats){
        require(_enemyId > 0 && _enemyId <= totalEnemyVariants, "Enemy does not exist");

        if(_enemyId == 1){
            return thief();
        }else if(_enemyId == 2){
            return outlaw();
        }
    }

    function thief() internal pure returns(dl.BattleStats memory enemyStats){
        enemyStats.damageMin = 1;
        enemyStats.damageMax = 3;
        enemyStats.critChance = 2;
        enemyStats.speed = 10;
        enemyStats.health = 20;
        enemyStats.defence = 0;
        enemyStats.evasiveness = 1;
        enemyStats.accuracy = 95;
        enemyStats.elementResist = 0;
    }

    function outlaw() internal pure returns(dl.BattleStats memory enemyStats){
        enemyStats.damageMin = 2;
        enemyStats.damageMax = 4;
        enemyStats.critChance = 2;
        enemyStats.speed = 15;
        enemyStats.health = 12;
        enemyStats.defence = 5;
        enemyStats.evasiveness = 3;
        enemyStats.accuracy = 96;
        enemyStats.elementResist = 0;
    }
}