// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract INFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Counter for tokenIds

    /**
     * @dev Constructor for contract name and symbol.
     */
    constructor() ERC721("iNFT", "iNFT") {}

    /**
     * @dev Base URI for computing {tokenURI}. The resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    /**
     * Creates a new token.
     *
     * A unique id is created for each token 'tokenId'.
     * The tokenURI is the URI to the metadata.
     * The user's address is mapped to the 'tokenId' and 'tokenURI'.
     */
    function mint(address to, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment(); // Increment counter
        uint256 newTokenId = _tokenIds.current(); // Create a tokenId from counter
        _mint(to, newTokenId); // Mint token
        _setTokenURI(newTokenId, tokenURI); // Save tokenURI
        return newTokenId; // Return tokenId
    }
}
