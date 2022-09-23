/** 
 *  @fileOverview This file is dedicated to the attributes of the characters
 *  @author     Marcus Marinelli
 *  @version    0.1.0
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../libraries/Structs.sol";

contract BattleStats {
    
    function wpnTypeToAttributes(uint256 _wpnType) public pure returns(string[] memory) {
        //getnum weapon types and check to see if in correct range
        string[] memory output;
        uint8 numAttributes;

        if(_wpnType == 1){
            numAttributes = 2;
            output = new string[](numAttributes);
            
            output[0] = "strength";
            output[1] = "dexterity";      
        }else if(_wpnType == 2){
            numAttributes = 1;
            output = new string[](numAttributes);
            
            output[0] = "strength";
        }else if(_wpnType == 3){
             numAttributes = 3;
            output = new string[](numAttributes);
            
            output[0] = "strength";
            output[1] = "technical";
            output[2] = "instinct";
        }else if(_wpnType == 4){
            numAttributes = 1;
            output = new string[](numAttributes);
            
            output[0] = "technical";
        }else if(_wpnType == 5){
                        numAttributes = 1;
            output = new string[](numAttributes);
            
            output[0] = "technical";
        }

        return output;
    }
}