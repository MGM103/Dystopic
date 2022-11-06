//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../libraries/Structs.sol";

interface IStats {
    function getStats(uint256 _tokenId) external view returns(dl.BattleStats memory stats);
}