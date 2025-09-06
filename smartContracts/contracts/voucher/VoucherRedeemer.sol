// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract VoucherRedeemer {
    using ECDSA for bytes32;

    IERC20 public immutable edaToken;
    address public immutable signer; // backend address that signs vouchers

    mapping(uint256 => bool) public usedNonces;

    event Redeemed(address indexed user, uint256 amount, uint256 nonce);

    constructor(address _token, address _signer) {
        require(_token != address(0), "Invalid token address");
        require(_signer != address(0), "Invalid signer address");
        edaToken = IERC20(_token);
        signer = _signer;
    }

    function redeem(
        uint256 amount,
        uint256 nonce,
        bytes memory signature
    ) external {
        require(!usedNonces[nonce], "Voucher already used");

        // Hash the data
        bytes32 hash = keccak256(
            abi.encodePacked(msg.sender, amount, nonce, address(this))
        ).toEthSignedMessageHash();

        // Verify signature
        require(hash.recover(signature) == signer, "Invalid signature");

        // Mark nonce used
        usedNonces[nonce] = true;

        // Transfer tokens
        require(edaToken.transfer(msg.sender, amount), "Transfer failed");

        emit Redeemed(msg.sender, amount, nonce);
    }
}
