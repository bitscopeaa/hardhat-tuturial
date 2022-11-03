// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Token{
    uint256 public totalSupply = 10000;
    address public owner;
    mapping(address=>uint256) private balance;
    string public name = "MyToken";
    string public symbol = "D";

    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor(){
        owner = msg.sender;
        balance[owner] = totalSupply;
    }

    function transfer(address to, uint256 amount) external{
       require(balance[msg.sender]>=amount, "balance not enough");
       balance[msg.sender] -= amount;
       balance[to] += amount;
       emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account)  external view returns (uint256) {
        return balance[account];
    }

}