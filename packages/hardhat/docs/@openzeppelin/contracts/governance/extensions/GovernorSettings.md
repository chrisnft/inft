## `GovernorSettings`



Extension of {Governor} for settings updatable through governance.

_Available since v4.4._


### `constructor(uint256 initialVotingDelay, uint256 initialVotingPeriod, uint256 initialProposalThreshold)` (internal)



Initialize the governance parameters.

### `votingDelay() → uint256` (public)



See {IGovernor-votingDelay}.

### `votingPeriod() → uint256` (public)



See {IGovernor-votingPeriod}.

### `proposalThreshold() → uint256` (public)



See {Governor-proposalThreshold}.

### `setVotingDelay(uint256 newVotingDelay)` (public)



Update the voting delay. This operation can only be performed through a governance proposal.

Emits a {VotingDelaySet} event.

### `setVotingPeriod(uint256 newVotingPeriod)` (public)



Update the voting period. This operation can only be performed through a governance proposal.

Emits a {VotingPeriodSet} event.

### `setProposalThreshold(uint256 newProposalThreshold)` (public)



Update the proposal threshold. This operation can only be performed through a governance proposal.

Emits a {ProposalThresholdSet} event.

### `_setVotingDelay(uint256 newVotingDelay)` (internal)



Internal setter for the voting delay.

Emits a {VotingDelaySet} event.

### `_setVotingPeriod(uint256 newVotingPeriod)` (internal)



Internal setter for the voting period.

Emits a {VotingPeriodSet} event.

### `_setProposalThreshold(uint256 newProposalThreshold)` (internal)



Internal setter for the proposal threshold.

Emits a {ProposalThresholdSet} event.


### `VotingDelaySet(uint256 oldVotingDelay, uint256 newVotingDelay)`





### `VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod)`





### `ProposalThresholdSet(uint256 oldProposalThreshold, uint256 newProposalThreshold)`







