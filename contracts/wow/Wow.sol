// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/utils/introspection/ERC165.sol";


import "../core/SemanticSBT.sol";


contract Wow is SemanticSBT {

    struct WowWithSign {
        SemanticSBTLogic.Signature sig;
        address addr;
        uint256 oIndex;
    }

    bytes32 internal constant WOW_WITH_SIGN_TYPE_HASH = keccak256('WOW_WITH_SIGN_TYPE_HASH(uint256 oIndex,uint256 nonce,uint256 deadline)');
    uint256 _sIndex = 1;
    uint256 _pIndex = 1;
    mapping(address => uint256) public nonces;


    /* ============ External Functions ============ */

    function addSubject(string memory value, string memory className_) public onlyMinter returns (uint256 sIndex) {
        return SemanticSBTLogic.addSubject(value, className_, _subjects, _subjectIndex, _classIndex);
    }

    function wowWithSign(WowWithSign calldata vars) external onlyMinter returns (uint256) {
        unchecked {
            SemanticSBTLogic.recoverSignerFromSignature(
                name(),
                address(this),
                keccak256(
                    abi.encode(
                        WOW_WITH_SIGN_TYPE_HASH,
                        vars.oIndex,
                        nonces[vars.addr]++,
                        vars.sig.deadline
                    )
                ),
                vars.addr,
                vars.sig
            );
        }
        require(vars.addr != address(0), "SemanticSBT: mint to the zero address");

        uint256 tokenId = _addEmptyToken(vars.addr, _sIndex);
        IntPO[] memory intPOList = new IntPO[](0);
        StringPO[] memory stringPOList = new StringPO[](0);
        AddressPO[] memory addressPOList = new AddressPO[](0);
        SubjectPO[] memory subjectPOList = new SubjectPO[](1);
        BlankNodePO[] memory blankNodePOList = new BlankNodePO[](0);
        subjectPOList[0] = SubjectPO(_pIndex, vars.oIndex);
        _mint(tokenId, vars.addr, intPOList, stringPOList, addressPOList, subjectPOList, blankNodePOList);
        return tokenId;
    }


}