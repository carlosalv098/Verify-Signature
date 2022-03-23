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
    // construct the message
    bytes32 messageHash = keccak256(abi.encodePacked(address(this), msg.sender));
    // using ECDSA recover the signer => uses ecrecover in the background
    address signer = messageHash.toEthSignedMessageHash().recover(_sig);

    // check if the signer is allowed or not
    if(owner == signer) return(signer, true);
    else return(signer, false);
  }


}