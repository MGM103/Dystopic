/** 
 *  @fileOverview This first quest in the game, inherits from QuestFactory
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./QuestFactory.sol";
import "../Credits.sol";

contract Prologue is QuestFactory, Credits {
    uint256[] public enemyVariants;
    uint256 public immutable reward;
    uint256[] public loot;

    event BeganQuest(address indexed owner, uint256 tokenId);
    event AbortedQuest(address indexed owner, uint256 tokenId);
    event CompletedQuest(address indexed owner, uint256 tokenId, uint256 xp, uint256 reward, uint256 loot);

    constructor(
        address _dystopicAddr, 
        address _weaponAddr,
        uint256 _xp, 
        uint256[] memory _enemyVariants,
        uint256 _reward,
        uint256[] memory _loot
    ) 
    QuestFactory(_dystopicAddr, _weaponAddr, _xp) {
        enemyVariants = _enemyVariants;
        reward = _reward;
        loot = _loot;
    }

    function beginQuest(uint256 tokenId) external override {
        emit BeganQuest(msg.sender, tokenId);
    }

    //add access modifier
    function completeQuest(address player, uint256 tokenId) external override {
        awardXp(tokenId);
        transferReward();
        transferLoot(player);
        
        emit CompletedQuest(msg.sender, tokenId, questXp, reward, loot[0]);
    }

    function abortQuest(uint256 tokenId) external override {
        emit AbortedQuest(msg.sender, tokenId);
    }

    function transferLoot(address player) internal override {
        //implement VRF
        awardLoot(loot[0], player);
    }

    function transferReward() internal override {
        Credits.mint(msg.sender, reward);
    }
}