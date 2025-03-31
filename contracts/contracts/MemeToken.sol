// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeToken is ERC20, Ownable {
    uint256 public taxFee;
    uint256 public maxSupply;

    mapping(address => bool) private excludedFromFees;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 initialSupply,
        uint256 _maxSupply,
        uint256 _taxFee
    ) ERC20(_name, _symbol) {
        require(_taxFee <= 1000, "Fee too high");
        _mint(msg.sender, initialSupply * 10 ** decimals());
        maxSupply = _maxSupply * 10 ** decimals();
        taxFee = _taxFee;
        excludedFromFees[msg.sender] = true;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if (excludedFromFees[from] || excludedFromFees[to]) {
            super._transfer(from, to, amount);
        } else {
            uint256 fee = (amount * taxFee) / 10000;
            uint256 amountAfterFee = amount - fee;

            super._transfer(from, owner(), fee);
            super._transfer(from, to, amountAfterFee);
        }
    }

    function excludeFromFee(address account) external onlyOwner {
        excludedFromFees[account] = true;
    }

    function includeInFee(address account) external onlyOwner {
        excludedFromFees[account] = false;
    }

    function updateTaxFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high");
        taxFee = newFee;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Exceeds max supply");
        _mint(to, amount);
    }
}
