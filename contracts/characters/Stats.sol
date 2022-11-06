/** 
 *  @fileOverview This file is dedicated to the stats of the characters, 
 *  which are a manifestation of thier attributes and architype and used in battle
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IDystopic.sol";
import "./IAttributes.sol";
import "../libraries/Structs.sol";

contract Stats {
    //interfaces
    IDystopic immutable IDyst;
    IAttributes immutable IAttr;

    constructor(address _IDystopic, address _IAttributes) {
        IDyst = IDystopic(_IDystopic);
        IAttr = IAttributes(_IAttributes);
    }

    function getStats(uint256 _tokenId) public view returns(dl.BattleStats memory stats) {
        stats.meleeDmg = calcMeleeDmg(_tokenId);
        stats.rangedDmg = calcRngDmg(_tokenId);
        stats.health = calcHealth(_tokenId);
        stats.speed = calcSpeed(_tokenId);
        stats.defence = calcDef(_tokenId);
        stats.crit = calcCrit(_tokenId);
        stats.evasiveness = calcEvade(_tokenId);
        stats.elementResist = calcElementResist(_tokenId);
    }

    function getArchitype(uint256 _tokenId) internal view returns(uint256 architype) {
        return IDyst.architype(_tokenId);
    }

    function getAttributes(uint256 _tokenId) internal view returns(
        uint256,
        uint256,
        uint256,
        uint256,
        uint256,
        uint256, 
        uint256
    ) {
        return IAttr.idToAttributes(_tokenId);
    }

    function getLevel(uint256 _tokenId) internal view returns(uint256 level) {
        return IDyst.level(_tokenId);
    }

    function calcMeleeDmg(uint256 _tokenId) internal view returns(uint256 meleeDmg) {
        uint256 architype = getArchitype(_tokenId);
        uint256 level = getLevel(_tokenId);
        (uint256 str,,,,, uint256 dex,) = getAttributes(_tokenId);

        if(architype == 1){
            meleeDmg = (((str + 3) * 90) + (dex * 10)) * level;
        }else if(architype == 2){
            meleeDmg = (((str + 4) * 90) + (dex * 10)) * level;
        }else{
            meleeDmg = (((str + 5) * 80) + ((dex + 2) * 20)) * level;
        }
    }

    function calcRngDmg(uint256 _tokenId) internal view returns(uint256 rngDmg) {
        uint256 architype = getArchitype(_tokenId);
        uint256 level = getLevel(_tokenId);
        (uint256 str,,,uint256 tech,uint256 instinct, uint256 dex,) = getAttributes(_tokenId);

        if(architype == 1){
            rngDmg = (((str + 3) * 5) + (dex * 80) + ((instinct + 5) * 10) + (tech * 5)) * level;
        }else if(architype == 2){
            rngDmg = (((str + 4) * 5) + (dex * 80) + (instinct * 5) + ((tech + 2) * 10)) * level;
        }else{
            rngDmg = (((str + 5) * 5) + ((dex + 2) * 80) + (instinct * 5) + ((tech + 3) * 10)) * level;
        }
    }

    function calcDef(uint256 _tokenId) internal view returns(uint256 def) {
        uint256 architype = getArchitype(_tokenId);
        uint256 level = getLevel(_tokenId);
        (uint256 str,, uint256 fort,,,,) = getAttributes(_tokenId);

        if(architype == 1){
            def = (((fort + 5) * 90) + (str * 10)) * level;
        }else if(architype == 2){
            def = (((fort + 2) * 90) + ((str + 1) * 10)) * level;
        }else{
            def = ((fort * 90) + ((str + 2) * 10)) * level;
        }
    }

    function calcEvade(uint256 _tokenId) internal view returns(uint256 evade) {
        uint256 architype = getArchitype(_tokenId);
        uint256 level = getLevel(_tokenId);
        (,,,,, uint256 dex, uint256 luck) = getAttributes(_tokenId);

        if(architype == 1){
            evade = ((dex * 40) + (luck * 60)) * level;
        }else if(architype == 2){
            evade = ((dex * 40) + ((luck + 1) * 60)) * level;
        }else{
            evade = (((dex + 1) * 40) + ((luck * 60))) * level;
        }
    }

    function calcHealth(uint256 _tokenId) internal view returns(uint256 health) {
        uint256 architype = getArchitype(_tokenId);
        uint256 level = getLevel(_tokenId);
        (,, uint256 fort,,,,) = getAttributes(_tokenId);

        if(architype == 1){
            health = 100 + (((fort + 5) * 100) * level);
        }else if(architype == 2){
            health = 100 + (((fort + 1) * 100) * level);
        }else{
            health = 100+ ((fort * 100) * level);
        }
    }

    function calcElementResist(uint256 _tokenId) internal view returns(uint256 elemResist) {
        uint256 architype = getArchitype(_tokenId);
        uint256 level = getLevel(_tokenId);
        (,, uint256 fort, uint256 tech, uint256 instinct,,) = getAttributes(_tokenId);

        if(architype == 1){
            elemResist = (((fort + 5) * 80) + (tech * 10) + ((instinct + 3) * 10)) * level;
        }else if(architype == 2){
            elemResist = (((fort + 1) * 80) + ((tech + 1) * 10) + (instinct * 10)) * level;
        }else{
            elemResist = ((fort * 80) + ((tech + 3) * 10) + (instinct * 10)) * level;
        }
    }

    function calcCrit(uint256 _tokenId) internal view returns(uint256 crit) {
        uint256 architype = getArchitype(_tokenId);
        uint256 level = getLevel(_tokenId);
        (,,,,,, uint256 luck) = getAttributes(_tokenId);

        if(architype == 1){
            crit = ((luck + 1) * 100) * level;
        }else if(architype == 2){
            crit = ((luck + 2) * 100) * level;
        }else{
            crit = (luck * 100) * level;
        }
    }

    function calcSpeed(uint256 _tokenId) internal view returns(uint256 speed) {
        uint256 architype = getArchitype(_tokenId);
        uint256 level = getLevel(_tokenId);
        (,uint256 spd,,,,uint256 dex,) = getAttributes(_tokenId);

        if(architype == 1){
            speed = ((spd * 95) + (dex * 5)) * level;
        }else if(architype == 2){
            speed = ((spd * 95) + ((dex + 2) * 5)) * level;
        }else{
            speed = (((spd + 1) * 95) + (dex * 5)) * level;
        }
    }
}