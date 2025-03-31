// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EfrogletNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    uint256 public maxSupply = 10000;

    mapping(address => uint256) public rewards;
    mapping(address => bool) public hasClaimed;

    event NFTMinted(address indexed owner, uint256 tokenId);

    constructor() ERC721("Efroglet NFT", "EFROG") {}

    function mintEfroglet(
        address to,
        string memory tokenURI
    ) external onlyOwner {
        require(nextTokenId < maxSupply, "Max supply reached");
        require(!hasClaimed[to], "NFT already claimed");

        uint256 tokenId = nextTokenId;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        hasClaimed[to] = true;
        nextTokenId++;

        emit NFTMinted(to, tokenId);
    }

    function updateRewards(address user, uint256 amount) external onlyOwner {
        rewards[user] += amount;
    }

    function getRewards(address user) external view returns (uint256) {
        return rewards[user];
    }

    function setMaxSupply(uint256 newMaxSupply) external onlyOwner {
        require(
            newMaxSupply >= nextTokenId,
            "New supply less than current NFTs"
        );
        maxSupply = newMaxSupply;
    }
}
