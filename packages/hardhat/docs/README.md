# INFT Contracts

This is an experimental ethereum dev environment for developing NFT contracts.
The contracts were developed with the [Hardhat](https://hardhat.org) framework and is a subclass of the [OpenZeppelin](https://openzeppelin.com/) contract library. All contracts implemented are MIT Licesesed.

## ERC721 (Non-Fungible Token Standard) Proposal

The authors of ERC-721 are William Entriken, Dieter Shirley, Jacob Evans, and Nastassia Sachswas.
created on 2018-01-24

In brief, according to their [proposal](https://eips.ethereum.org/EIPS/eip-721):

> "An ERC721 is a standard interface for non-fungible tokens, also known as deeds."

> "We considered use cases of NFTs being owned and transacted by individuals as well as consignment to third party brokers/wallets/auctioneers (“operators”). NFTs can represent ownership over digital or physical assets. We considered a diverse universe of assets, and we know you will dream up many more:

> - Physical property — houses, unique artwork
> - Virtual collectables — unique pictures of kittens, collectable cards
> - “Negative value” assets — loans, burdens and other responsibilities

> In general, all houses are distinct and no two kittens are alike. NFTs are distinguishable and you must track the ownership of each one separately.

## Motivation

## Development

_If you're new to smart contract development, head to [Developing Smart Contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts)._

ERC-721 defines a minimum interface a smart contract must implement to allow unique tokens to be managed, owned, and traded. It does not mandate a standard for token metadata or restrict adding supplemental functions.

First, the INFT contract is a subclass of OpenZeppelin's
[ERC721URIStorage](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol)
which is a subclasss of [ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol).

```
classDiagram
    IERC721 <|-- ERC721
    ERC721 <|-- ERC721URIStorage
    ERC721URIStorage <|-- INFT

    class ERC721{
    -string _name;
    -string _symbol;
    -mapping _owners;
    -mapping _balances;
    -mapping _tokenApprovals;
    -mapping _operatorApprovals;
    +constructor(string name_, string symbol_)
    +balanceOf(address owner)
    +ownerOf(uint256 tokenId)
    +tokenURI(uint256 tokenId)
    -_mint(address to, uint256 tokenId)
    -_safeMint(address to, uint256 tokenId)
    }

    class ERC721URIStorage{
      +tokenURI(uint256 tokenId)
      -mapping _tokenURIs
      -_setTokenURI(uint256 tokenId, string _tokenURI)
      -_tokenURI()
      -_burn(uint256 tokenId)
    }

    class INFT{
      +constructor(string name, string symbol)
      +mint(address to,string tokenURI)
      -_baseURI()
    }
```

<img src="./assets/inft-class-diagram.png"/>

## OpenZeppelin's ERC721 Contract Interface

```typescript
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.0 (token/ERC721/IERC721.sol)

pragma solidity ^0.8.0;

import "../../utils/introspection/IERC165.sol";

/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
}
```

## OpenZeppelin's ERC721URIStorage Interface

```typescript
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.0 (token/ERC721/extensions/ERC721URIStorage.sol)

pragma solidity ^0.8.0;

import "../ERC721.sol";

/**
 * @dev ERC721 token with storage based token URI management.
 */
abstract contract ERC721URIStorage is ERC721 {
    using Strings for uint256;

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }
}

```

## Config

### Hardhat Runtime Environment (HRE)

During development, the all scripts, tests, and tasks implent the Hardhat Runtime Environment (HRE).

The [Hardhat Runtime Environment](https://hardhat.org/advanced/hardhat-runtime-environment.html), or HRE for short, is an object containing all the functionality that Hardhat exposes when running a task, test or script. In reality, Hardhat is the HRE.

When you require Hardhat (`import hardhat from 'hardhat'`) you're getting an instance of the HRE.

During initialization, the Hardhat configuration file essentially constructs a list of things to be added to the HRE. This includes tasks, configs and plugins. Then when tasks, tests or scripts run, the HRE is always present and available to access anything that is contained in it.

The HRE has a role of centralizing coordination across all Hardhat components. This architecture allows for plugins to inject functionality that becomes available everywhere the HRE is accessible.

> Currently the interface for the HRE looks like this

```typescript
interface HardhatRuntimeEnvironment {
  // Hardhat's Runtime
  readonly config: HardhatConfig;
  readonly hardhatArguments: HardhatArguments;
  readonly tasks: TasksMap;
  readonly run: RunTaskFunction;
  readonly network: Network;
  readonly artifacts: Artifacts;
  // Extensions for plugins start here
}
```

## Deploy

TODO

## Requirements

This project requires [Node](https://nodejs.org/en/download/) (^16.0.0), [Git](https://git-scm.com/downloads), and [Typescript](https://www.typescriptlang.org/).

## Test Cases

TODO

//
// EXAMPLE
//
//

```
0xcert ERC-721 Token includes test cases written using Truffle.

Implementations
0xcert ERC721 – a reference implementation

MIT licensed, so you can freely use it for your projects
Includes test cases
Active bug bounty, you will be paid if you find errors
Su Squares – an advertising platform where you can rent space and place images

Complete the Su Squares Bug Bounty Program to seek problems with this standard or its implementation
Implements the complete standard and all optional interfaces
ERC721ExampleDeed – an example implementation

Implements using the OpenZeppelin project format
XXXXERC721, by William Entriken – a scalable example implementation

Deployed on testnet with 1 billion assets and supporting all lookups with the metadata extension. This demonstrates that scaling is NOT a problem
```

## References

TODO

[ERC721](https://eips.ethereum.org/EIPS/eip-721) -

[HRE](https://hardhat.org/advanced/hardhat-runtime-environment.html) - HRE overview.

[Hardhat](https://github.com/nomiclabs/hardhat) - Framework for developing and testing contracts.

## Citations

William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs, "EIP-721: Non-Fungible Token Standard," Ethereum Improvement Proposals, no. 721, January 2018. [Online serial]. Available: https://eips.ethereum.org/EIPS/eip-721.
