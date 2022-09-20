//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IQuest {
    function beginQuest(uint256 tokenId) external;
    function completeQuest(uint256 tokenId) external;
    function abortQuest(uint256 tokenId) external;
}