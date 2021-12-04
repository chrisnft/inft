## `INFT`

### `constructor()` (public)

Initializes the contract by setting a `name` and a `symbol` to the token collection.

Constructor for contract name and symbol.

### `_baseURI() → string` (internal)

Base URI for computing the {tokenURI}. The resulting URI for each
token will be the concatenation of the `baseURI` and the `tokenId`.

### `mint(address to, string tokenURI) → uint256` (public)

Creates a new token.
A unique id is created for each token 'tokenId'.
The tokenURI is the URI to the metadata.
The user's address is mapped to the 'tokenId' and 'tokenURI'.
