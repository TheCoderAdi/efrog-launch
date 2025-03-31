// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CroakStaking is Ownable {
    IERC20 public croakToken;

    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake) public stakes;
    mapping(address => bool) private isStaker;
    uint256 public rewardRate = 5;

    address[] public stakers;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);

    constructor(address _croakToken) {
        croakToken = IERC20(_croakToken);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            croakToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        if (stakes[msg.sender].amount == 0) {
            stakes[msg.sender] = Stake(amount, block.timestamp);
            if (!isStaker[msg.sender]) {
                stakers.push(msg.sender);
                isStaker[msg.sender] = true;
            }
        } else {
            stakes[msg.sender].amount += amount;
            stakes[msg.sender].timestamp = block.timestamp;
        }

        emit Staked(msg.sender, amount);
    }

    function unstake() external {
        Stake memory stakeData = stakes[msg.sender];
        require(stakeData.amount > 0, "No active stake");

        uint256 stakingTime = block.timestamp - stakeData.timestamp;
        uint256 reward = (stakeData.amount * rewardRate * stakingTime) /
            (100 * 365 days);

        delete stakes[msg.sender];

        croakToken.transfer(msg.sender, stakeData.amount + reward);
        emit Unstaked(msg.sender, stakeData.amount, reward);
    }

    function getStake(address user) external view returns (uint256, uint256) {
        if (stakes[user].amount == 0) {
            return (0, 0);
        }
        return (stakes[user].amount, stakes[user].timestamp);
    }

    function getReward(address user) external view returns (uint256) {
        Stake memory stakeData = stakes[user];
        if (stakeData.amount == 0) return 0;

        uint256 stakingTime = block.timestamp - stakeData.timestamp;
        uint256 reward = (stakeData.amount * rewardRate * stakingTime) /
            (100 * 365 days);

        return reward;
    }

    function getTopStakers() external view returns (address[] memory) {
        return stakers;
    }

    function setRewardRate(uint256 _rate) external onlyOwner {
        rewardRate = _rate;
    }
}
