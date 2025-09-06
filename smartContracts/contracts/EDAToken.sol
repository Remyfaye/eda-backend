// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EDAToken is ERC20, Pausable, Ownable {
    constructor() ERC20("EDAToken", "EDA") {
        // Mint initial supply to the deployer
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    // Pause all token transfers
    function pause() external onlyOwner {
        _pause();
    }

    // Unpause token transfers
    function unpause() external onlyOwner {
        _unpause();
    }

    // Override _beforeTokenTransfer to integrate pause functionality
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
