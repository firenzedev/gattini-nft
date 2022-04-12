// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Gattini is ERC721, Ownable {

    uint public constant MAX_SUPPLY = 100;

    uint public tokenPrice = 0.01 ether;
    string private baseURI;
    uint private tokenCounter = 0;
    
    constructor(string memory _baseTokenURI) ERC721("Gattini", "MIAO") {
        baseURI = _baseTokenURI;
    }

    function mint(uint _mintAmount) external payable {
        require(tokenCounter + _mintAmount <= MAX_SUPPLY, "max supply exceeded");
        require(msg.value >= tokenPrice * _mintAmount, "not enough ethers");
        
        for (uint i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, tokenCounter + i);
        }

        tokenCounter += _mintAmount;
    }

    function _baseURI() internal view override virtual returns (string memory) {
        return baseURI;
    }

    function withdraw() external onlyOwner {
        address payable wallet = payable(msg.sender);
        uint balance = address(this).balance;
        wallet.transfer(balance);
    }
}