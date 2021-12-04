// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/** @title INFT Mint ERC721 tokens. */
contract INFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Counter for tokenIds

    /**
     * @dev Constructor for contract name and symbol.
     *
     * @notice Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor() ERC721("INFT", "iNFT") {}

    /**
     * @dev Base URI for computing the {tokenURI}. The resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    /**
     * @dev Creates a new token.
     * A unique id is created for each token 'tokenId'.
     * The tokenURI is the URI to the metadata.
     * The user's address is mapped to the 'tokenId' and 'tokenURI'.
     *
     * @param to The user's address that's receiving the token
     * @param tokenURI The user's token metadata uri
     * @return The user's token id
     */
    function mint(address to, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment(); // Increment counter
        uint256 newTokenId = _tokenIds.current(); // Create a tokenId from counter
        _mint(to, newTokenId); // Mint token
        _setTokenURI(newTokenId, tokenURI); // Save tokenURI
        return newTokenId; // Return tokenId
    }
}
