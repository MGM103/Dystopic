/** 
 *  @fileOverview Interface to facilitate integration contracts to interact with weapon contracts
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../libraries/Structs.sol";

interface IWeapons {
    function ownerToTokenIds(uint256) external view returns(uint256[] memory);
    function tokenIdToWpnId(uint256) external view returns(uint256);
    function wpnIdToWpnStats(uint256) external pure returns(dl.Weapon memory);
    function wpnTypeToStr(uint256) external pure returns(string memory);
    function wpnTypeAttributes(uint256) external pure returns(dl.CharAttributes memory);
    function createWeapon(uint256) external;
    function createWeapon(uint256 _wpnVariant, address _to) external;
}