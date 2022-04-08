import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import {
  handleUpdateManagementFee,
  handleUpdatePerformanceFee,
  handleUpdateRewards,
} from '../../src/mappings/vaultMappings';
import { MockBlock } from '../mappingParamBuilders/mockBlock';
import { VaultStub } from '../stubs/vaultStateStub';
import {
  UpdateManagementFee,
  UpdatePerformanceFee,
  UpdateRewards,
} from '../../generated/Registry/Vault';
import { GenericAttributeUpdateEvent } from '../mappingParamBuilders/genericUpdateParam';

export class MockUpdateManagementFeeTransition {
  mockEvent: GenericAttributeUpdateEvent<UpdateManagementFee, BigInt>;
  preTransitionStub: VaultStub;
  postTransitionStub: VaultStub;

  constructor(preTransitionStub: VaultStub, newFee: string) {
    this.preTransitionStub = preTransitionStub;

    let postTransitionStub = preTransitionStub.clone();
    postTransitionStub.managementFee = newFee;
    this.postTransitionStub = postTransitionStub;

    this.mockEvent = new GenericAttributeUpdateEvent<
      UpdateManagementFee,
      BigInt
    >(preTransitionStub.shareToken.address, newFee, null, null);

    handleUpdateManagementFee(this.mockEvent.mock);

    MockBlock.IncrementBlock();
  }
}

export class MockUpdatePerformanceFeeTransition {
  mockEvent: GenericAttributeUpdateEvent<UpdatePerformanceFee, BigInt>;
  preTransitionStub: VaultStub;
  postTransitionStub: VaultStub;

  constructor(preTransitionStub: VaultStub, newFee: string) {
    this.preTransitionStub = preTransitionStub;

    let postTransitionStub = preTransitionStub.clone();
    postTransitionStub.performanceFee = newFee;
    this.postTransitionStub = postTransitionStub;

    this.mockEvent = new GenericAttributeUpdateEvent<
      UpdatePerformanceFee,
      BigInt
    >(preTransitionStub.shareToken.address, newFee, null, null);

    handleUpdatePerformanceFee(this.mockEvent.mock);

    MockBlock.IncrementBlock();
  }
}

export class MockUpdateRewardsTransition {
  mockEvent: GenericAttributeUpdateEvent<UpdateRewards, Address>;
  preTransitionStub: VaultStub;
  postTransitionStub: VaultStub;

  constructor(preTransitionStub: VaultStub, newAddress: string) {
    this.preTransitionStub = preTransitionStub;

    let postTransitionStub = preTransitionStub.clone();
    postTransitionStub.rewardsAddress = newAddress;
    this.postTransitionStub = postTransitionStub;

    this.mockEvent = new GenericAttributeUpdateEvent<UpdateRewards, Address>(
      preTransitionStub.shareToken.address,
      newAddress,
      null,
      null
    );

    handleUpdateRewards(this.mockEvent.mock);

    MockBlock.IncrementBlock();
  }
}
