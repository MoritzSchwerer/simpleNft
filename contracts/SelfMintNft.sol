//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SelfMintNft is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 private _totalValue;

  mapping(address => uint256) private _userValue;

  constructor() ERC721("SelfMintNft", "SMN") {}

  function mint() public payable returns (uint256) {
    address receiver = _msgSender();
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(receiver, newItemId);
    uint256 value = msg.value;
    _totalValue += value;
    _userValue[receiver] += value;
    require(value > 0, "ValueNft: value must be greater than 0");
    return newItemId;
  }

  function totalValue() external view returns (uint256) {
    return _totalValue;
  }

  function userValue(address user) external view returns (uint256) {
    return _userValue[user];
  }
}
