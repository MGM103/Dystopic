//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../libraries/Structs.sol";

interface IAbilities {
    function idToAbilities(uint256) external returns(uint256[2] memory); //ensure array size is consistent with max_abilities in abilities
    function initAttributesSet(uint256) external returns(bool);
    function setInitAbilities(uint256 tokenId, uint256 abilityId, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external;
    function changeAbility(uint256 tokenId, uint256 abilityToChange, uint256 abilityToAdd, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external;
    function addAbility(uint256 tokenId, uint256 abilityToAdd, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external;
    function abilityToModifiers(uint256 abilityId) external pure returns(dl.BattleStats memory, uint256 duration);
    function abilityToRequirements(uint256 abilityId) external pure returns(uint256, dl.Architypes, dl.CharAttributes memory);
}