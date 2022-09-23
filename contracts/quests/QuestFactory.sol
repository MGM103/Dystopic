/** 
 *  @fileOverview This abstract class is a template for quest contracts
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./EnemyManifest.sol";
import "../libraries/Structs.sol";
import "../characters/IDystopic.sol";
import "../items/IWeapons.sol";

abstract contract QuestFactory is EnemyManifest {
    IDystopic immutable IDyst;
    IWeapons immutable IWpn;
    uint256 immutable questXp;

    constructor(address _IDyst, address _IWpn, uint256 _questXp){
        IDyst = IDystopic(_IDyst);
        IWpn = IWeapons(_IWpn);
        questXp = _questXp;
    }

    function getEnemy(uint256 _enemyId) internal pure returns(dl.BattleStats memory) {
        return EnemyManifest.enemyIdToEnemyStats(_enemyId);
    }  

    function awardXp(uint256 _tokenId) internal {
        IDyst.gainXp(_tokenId, questXp);
    }

    function awardLoot(uint256 _wpnId, address _to) internal {
        IWpn.createWeaponTo(_wpnId, _to);
    }

    function beginQuest(uint256 _tokenId) external virtual;
    function abortQuest(uint256 _tokenId) external virtual;
    function completeQuest(address player, uint256 _tokenId) external virtual;
    function transferLoot(address player) internal virtual;
    function transferReward() internal virtual;
}