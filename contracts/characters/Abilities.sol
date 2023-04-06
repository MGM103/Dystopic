/** 
 *  @fileOverview This file is the maps the characters to their respective special abilities in the Dystopik game.
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./AbilitiesManifest.sol";
import "../utilities/Structs.sol";
import "./IDystopic.sol";
import "./IAttributes.sol";
import "../utilities/Constants.sol";

contract Abilities is AbilitiesManifest {
    
    mapping(uint256 => uint256[NUM_ABILITIES]) public idToAbilities;
    mapping(uint256 => bool) public initAbilitiesSet;

    event initialisedAbilities(address indexed owner, uint256 characterId, uint256[NUM_ABILITIES] abilities, uint256 abilityAdded);
    event abilityChanged(address indexed owner, uint256 characterId, uint256[NUM_ABILITIES] abilities, uint256 abilityAdded, uint256 abilityDropped);
    event abilityAdded(address indexed owner, uint256 characterId, uint256[NUM_ABILITIES] abilites, uint256 abilityAdded);

    constructor() {}

    function getAbilities(uint256 tokenId) public view returns(uint256[NUM_ABILITIES] memory) {
        return idToAbilities[tokenId];
    }

    function setInitAbilities(uint256 tokenId, uint256 abilityId, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external {
        require(initAbilitiesSet[tokenId] == false, "Initial ability has already been set");
        require(abilityId >= 1 && abilityId <= TOTAL_ABILITIES, "Ability not found");

        (uint256 lvlReq, dl.Architypes architypeReq, dl.CharAttributes memory attrReq) = abilityToRequirements(abilityId);
        require(level >= lvlReq, "Ability level requirement not met");
        require(architypeReq == dl.Architypes.ANY || uint(architypeReq) == architype, "Ability architype requirement not met");
        require(
            attrReq.strength <= attributes.strength &&
            attrReq.speed <= attributes.speed &&
            attrReq.fortitude <= attributes.fortitude &&
            attrReq.technical <= attributes.technical &&
            attrReq.instinct <= attributes.instinct &&
            attrReq.dexterity <= attributes.dexterity &&
            attrReq.luck <= attributes.luck,
            "Ability attribute requirements not met"
        );

        idToAbilities[tokenId][0] = abilityId;
        initAbilitiesSet[tokenId] = true;
        emit initialisedAbilities(msg.sender, tokenId, idToAbilities[tokenId], abilityId);
    }

    function changeAbility(uint256 tokenId, uint256 abilityToChange, uint256 abilityToAdd, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external {
        require(initAbilitiesSet[tokenId] == true, "Abilities must be initialised before they can be changed");
        require(abilityToChange >= 1 && abilityToChange <= TOTAL_ABILITIES, "Ability being changed not found");
        require(abilityToAdd >= 1 && abilityToAdd <= TOTAL_ABILITIES, "Ability being added not found");
        require(abilityToAdd != abilityToChange, "Abilities are the same");  

        (uint256 lvlReq, dl.Architypes architypeReq, dl.CharAttributes memory attrReq) = abilityToRequirements(abilityToAdd);

        require(level >= lvlReq, "Ability level requirement not met");
        require(architypeReq == dl.Architypes.ANY || uint(architypeReq) == architype, "Ability architype requirement not met");
        require(
            attrReq.strength <= attributes.strength &&
            attrReq.speed <= attributes.speed &&
            attrReq.fortitude <= attributes.fortitude &&
            attrReq.technical <= attributes.technical &&
            attrReq.instinct <= attributes.instinct &&
            attrReq.dexterity <= attributes.dexterity &&
            attrReq.luck <= attributes.luck,
            "Ability attribute requirements not met"
        );

        uint256 i;
        bool abilityPresent = false;
        uint256[NUM_ABILITIES] memory abilities = idToAbilities[tokenId];

        for(i = 0; i < NUM_ABILITIES; i++){
            if(abilities[i] == abilityToAdd){
                abilityPresent = true;
            }
        }

        require(abilityPresent == false, "Ability already owned");

        abilityPresent = false;

        for(i = 0; i < NUM_ABILITIES; i++){
            if(abilities[i] == abilityToChange){
                abilityPresent = true;
                abilities[i] = abilityToAdd;
            }
        }

        require(abilityPresent == true, "Ability to change is not present");

        idToAbilities[tokenId] = abilities;
        emit abilityChanged(msg.sender, tokenId, abilities, abilityToAdd, abilityToChange);
    }

    function addAbility(uint256 tokenId, uint256 abilityToAdd, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external {
        require(initAbilitiesSet[tokenId] == true, "Abilities must be initialised before they can be changed");
        require(abilityToAdd >= 1 && abilityToAdd <= TOTAL_ABILITIES, "Ability being added not found");

        (uint256 lvlReq, dl.Architypes architypeReq, dl.CharAttributes memory attrReq) = abilityToRequirements(abilityToAdd);

        require(level >= lvlReq, "Ability level requirement not met");
        require(architypeReq == dl.Architypes.ANY || uint(architypeReq) == architype, "Ability architype requirement not met");
        require(
            attrReq.strength <= attributes.strength &&
            attrReq.speed <= attributes.speed &&
            attrReq.fortitude <= attributes.fortitude &&
            attrReq.technical <= attributes.technical &&
            attrReq.instinct <= attributes.instinct &&
            attrReq.dexterity <= attributes.dexterity &&
            attrReq.luck <= attributes.luck,
            "Ability attribute requirements not met"
        );

        uint256 i;
        bool abilitySlotFree = false;
        bool abilityExists = false;
        uint256[NUM_ABILITIES] memory abilities = idToAbilities[tokenId];

        for(i = 0; i < NUM_ABILITIES; i++){
            if(abilities[i] == abilityToAdd){
                abilityExists = true;
                break;
            }else if(abilities[i] == 0){
                abilitySlotFree = true;
                abilities[i] = abilityToAdd;
            }
        }

        require(abilityExists == false, "Ability already owned");
        require(abilitySlotFree == true, "All ability slots have been assigned");

        idToAbilities[tokenId] = abilities;
        emit abilityAdded(msg.sender, tokenId, abilities, abilityToAdd);
    }
}