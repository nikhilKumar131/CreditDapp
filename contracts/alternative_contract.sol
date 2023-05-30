// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract CreditBank {

    mapping(address => uint ) internal _balances;
    mapping(address => bool ) internal enrolledCheck;
    address owner;

    constructor(){
        owner = msg.sender;
    }

    modifier EnroleCheckModifier() {
        require(enrolledCheck[msg.sender] == true,"enrole first to use all the functions");
        _;
    }

    function enrole() public {
        require(enrolledCheck[msg.sender] == false,"you have already enrolled with this account");
        _balances[msg.sender] += 1000;
        enrolledCheck[msg.sender] = true;
    }

    function transfer(address _to, uint _amt) public EnroleCheckModifier(){
        require(_to != address(0), "can not sent to address 0");
        require(_amt != 0,"amount can not be 0");
        uint myBalance = _balances[msg.sender];
        require(myBalance >= _amt);
        _balances[msg.sender] = myBalance - _amt;
        _balances[_to] += _amt;
    }

    function balanceOf(address _of) public EnroleCheckModifier() view returns(uint){
        uint balance = _balances[_of];
        return balance;
    }

    function mint(address _to, uint _amt) public{
        require(msg.sender == owner,"only owner can use this function");
        require(_to != address(0), "can not sent to address 0");
         _balances[_to] += _amt;

    }



}
