//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract RestrictedContract {

  address immutable owner;

  using ECDSA for bytes32;

  constructor(){
    owner = msg.sender;
  }

  function verifyMessage(bytes memory _sig) public view returns (address, bool) {
    bytes32 messageHash = keccak256(abi.encodePacked(address(this), msg.sender));
    address signer = messageHash.toEthSignedMessageHash().recover(_sig);

    if(owner == signer) return(signer, true);
    else return(signer, false);
  }


}