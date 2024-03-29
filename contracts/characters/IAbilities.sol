//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../utilities/Structs.sol";

interface IAbilities {
    function getAbilities(uint256 tokenId) external view returns(uint256[2] memory); //ensure array size is consistent with max_abilities in abilities
    function initAbilitiesSet(uint256) external view returns(bool);
    function setInitAbilities(uint256 tokenId, uint256 abilityId, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external;
    function changeAbility(uint256 tokenId, uint256 abilityToChange, uint256 abilityToAdd, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external;
    function addAbility(uint256 tokenId, uint256 abilityToAdd, uint256 level, uint256 architype, dl.CharAttributes memory attributes) external;
    function abilityToModifiers(uint256 abilityId) external pure returns(dl.BattleStats memory, uint256 duration);
    function abilityToRequirements(uint256 abilityId) external pure returns(uint256, dl.Architypes, dl.CharAttributes memory);
    function abilityToStr(uint256 abilityId) external pure returns(string memory);
}