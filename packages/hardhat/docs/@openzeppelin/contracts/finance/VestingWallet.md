## `VestingWallet`



This contract handles the vesting of Eth and ERC20 tokens for a given beneficiary. Custody of multiple tokens
can be given to this contract, which will release the token to the beneficiary following a given vesting schedule.
The vesting schedule is customizable through the {vestedAmount} function.

Any token transferred to this contract will follow the vesting schedule as if they were locked from the beginning.
Consequently, if the vesting has already started, any amount of tokens sent to this contract will (at least partly)
be immediately releasable.


### `constructor(address beneficiaryAddress, uint64 startTimestamp, uint64 durationSeconds)` (public)



Set the beneficiary, start timestamp and vesting duration of the vesting wallet.

### `receive()` (external)



The contract should be able to receive Eth.

### `beneficiary() → address` (public)



Getter for the beneficiary address.

### `start() → uint256` (public)



Getter for the start timestamp.

### `duration() → uint256` (public)



Getter for the vesting duration.

### `released() → uint256` (public)



Amount of eth already released

### `released(address token) → uint256` (public)



Amount of token already released

### `release()` (public)



Release the native token (ether) that have already vested.

Emits a {TokensReleased} event.

### `release(address token)` (public)



Release the tokens that have already vested.

Emits a {TokensReleased} event.

### `vestedAmount(uint64 timestamp) → uint256` (public)



Calculates the amount of ether that has already vested. Default implementation is a linear vesting curve.

### `vestedAmount(address token, uint64 timestamp) → uint256` (public)



Calculates the amount of tokens that has already vested. Default implementation is a linear vesting curve.

### `_vestingSchedule(uint256 totalAllocation, uint64 timestamp) → uint256` (internal)



Virtual implementation of the vesting formula. This returns the amout vested, as a function of time, for
an asset given its total historical allocation.


### `EtherReleased(uint256 amount)`





### `ERC20Released(address token, uint256 amount)`







