// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract CreditBank2 {

    int immutable internal initialBalance = 1000;
    mapping(address => int ) internal _balances;
    address owner;

    constructor(){
        owner = msg.sender;
    }

    function transfer(address _to, int _amt) public {
        require(_to != address(0), "can not sent to address 0 ");
        require(_amt > 0,"amount can not be 0 or smaller");
        //solve -ve amt problem
        int myBalance = balanceOf(_to);
        require(myBalance >= _amt);
        _balances[msg.sender] = _balances[msg.sender] - _amt;
        _balances[_to] += _amt;
    }

    function balanceOf(address _of) public view returns(int){
        int balance = _balances[_of] + 1000;
        return balance;
    }

    function mint(address _to, int _amt) public{
        require(msg.sender == owner,"only owner can use this function");
        require(_to != address(0), "can not sent to address 0");
        require(_amt > 0,"amount can not be 0  or smaller");
         _balances[_to] += _amt;

    }



}

//0xbF6674f9582d3dadCdfce58253244cbCb1EC172c

//0xbF6674f9582d3dadCdfce58253244cbCb1EC172c
