/** 
 *  @fileOverview This file is the base layer for weapons, 
 *  it maps the ids of weapons to their respective stats
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../utilities/Structs.sol";

contract WeaponManifest {
    uint256 public constant totalVariants = 3;

    function wpnIdToWpnStats(uint256 _wpnID) public pure returns(dl.Weapon memory _weapon){
        if(_wpnID == 1){
            return baton();
        }else if(_wpnID == 2){
            return metalRod();
        }else if (_wpnID == 3){
            return shiv();
        }
    }

    function wpnTypeToStr(uint256 _typeID) public pure returns(string memory strTypeID){
        if(_typeID == 1){
            return "Slashing";
        }else if(_typeID == 2){
            return "Bludgeoning";
        }else if(_typeID == 3){
            return "Piercing";
        }else if(_typeID == 4){
            return "Shock";
        }else if(_typeID == 5){
            return "Primitive";
        }
    }

    function wpnTypeAttributes(uint256 _typeID) public pure returns(dl.CharAttributes memory attributeMods){
        if(_typeID == 1){
            attributeMods.strength = 50;
            attributeMods.dexterity = 50;
        }else if(_typeID == 2){
            attributeMods.strength = 100;
        }else if(_typeID == 3){
            attributeMods.strength = 80;
            attributeMods.instinct = 10;
            attributeMods.dexterity = 10;
        }else if(_typeID == 4){
            attributeMods.technical = 100;
        }else if(_typeID == 5){
            attributeMods.instinct = 100;
        }
    }

    function baton() internal pure returns(dl.Weapon memory _weapon){
        _weapon.variantID = 1;
        _weapon.name = "Baton";
        _weapon.description = "Standard issue police officer protection baton";
        _weapon.imageURI = "https://media.istockphoto.com/vectors/vector-sketch-telescopic-baton-vector-id493024442?k=6&m=493024442&s=612x612&w=0&h=mdbaLmnSoq4fJtHagvL3uvtHkiW_Pj1a8l9t_PMO1fY=";
        _weapon.damageType = 1;
        _weapon.limitedSupply = false;
        _weapon.limit = 0;
        _weapon.cost = 10;
        _weapon.damageMin = 1;
        _weapon.weight = 2;
        _weapon.damageMax = 5;
        _weapon.critChance = 1;
    }

    function metalRod() internal pure returns(dl.Weapon memory _weapon){
        _weapon.variantID = 2;
        _weapon.name = "Metal Rod";
        _weapon.description = "That constuction site doesn't need this";
        _weapon.imageURI = "https://clipground.com/images/metal-rod-clipart-6.jpg";
        _weapon.damageType = 2;
        _weapon.limitedSupply = false;
        _weapon.limit = 0;
        _weapon.cost = 5;
        _weapon.damageMin = 1;
        _weapon.weight = 2;
        _weapon.damageMax = 5;
        _weapon.critChance = 1;
    }

    function shiv() internal pure returns(dl.Weapon memory _weapon){
        _weapon.variantID = 3;
        _weapon.name = "Shiv";
        _weapon.description = "Stick them with the pointy end";
        _weapon.imageURI = "https://static.wikia.nocookie.net/skyrim_gamepedia/images/b/b6/Shiv.png/revision/latest?cb=20120114155931";
        _weapon.damageType = 3;
        _weapon.limitedSupply = false;
        _weapon.limit = 0;
        _weapon.cost = 8;
        _weapon.damageMin = 3;
        _weapon.weight = 1;
        _weapon.damageMax = 8;
        _weapon.critChance = 2;
    }
}