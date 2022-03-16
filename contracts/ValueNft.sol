//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ValueNft is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 private _totalValue;

  address private _minter;

  mapping(address => uint256) private _userValue;

  constructor() ERC721("RewardToken", "RT") {
    _minter = _msgSender();
  }

  modifier onlyMinter() {
    require(_msgSender() == _minter, "ValueNft: only minter can mint"); 
    _;
  }

  function reward(address receiver, uint256 value)
    public
    onlyMinter
    returns(uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(receiver, newItemId);
    _totalValue += value;
    _userValue[receiver] += value;
    require(value > 0, "ValueNft: value must be greater than 0");
    return newItemId;
  }

  function minter() public view returns(address) {
    return _minter;
  }

  function totalValue() external view returns(uint256) {
    return _totalValue;
  }

  function userValue(address user) external view returns(uint256) {
    return _userValue[user];
  }

}
