import { Address } from '@graphprotocol/graph-ts';
import { MockBlock } from '../mappingParamBuilders/mockBlock';
import { GenericAttributeUpdateEvent } from '../mappingParamBuilders/genericUpdateParam';
import {
  SetDoHealthCheck,
  SetHealthCheck,
} from '../../generated/templates/Vault/Strategy';
import { StrategyStub } from '../stubs/strategyStateStub';
import {
  handleSetDoHealthCheckEvent,
  handleSetHealthCheckEvent,
} from '../../src/mappings/strategyMappings';

export class SetHealthCheckTransition {
  mockEvent: GenericAttributeUpdateEvent<SetHealthCheck, Address>;
  preTransitionStub: StrategyStub;
  postTransitionStub: StrategyStub;

  constructor(preTransitionStub: StrategyStub, newHealthCheckAddress: string) {
    this.preTransitionStub = preTransitionStub;

    let postTransitionStub = preTransitionStub.clone();
    postTransitionStub.healthCheck = newHealthCheckAddress;
    this.postTransitionStub = postTransitionStub;

    this.mockEvent = new GenericAttributeUpdateEvent<SetHealthCheck, Address>(
      preTransitionStub.address,
      newHealthCheckAddress,
      null,
      null
    );

    handleSetHealthCheckEvent(this.mockEvent.mock);

    MockBlock.IncrementBlock();
  }
}

export class SetDoHealthCheckTransition {
  mockEvent: GenericAttributeUpdateEvent<SetDoHealthCheck, boolean>;
  preTransitionStub: StrategyStub;
  postTransitionStub: StrategyStub;

  constructor(preTransitionStub: StrategyStub, doHealthCheck: boolean) {
    this.preTransitionStub = preTransitionStub;

    let postTransitionStub = preTransitionStub.clone();
    postTransitionStub.doHealthCheck = doHealthCheck;
    this.postTransitionStub = postTransitionStub;

    this.mockEvent = new GenericAttributeUpdateEvent<SetDoHealthCheck, boolean>(
      preTransitionStub.address,
      doHealthCheck.toString(),
      null,
      null
    );

    handleSetDoHealthCheckEvent(this.mockEvent.mock);

    MockBlock.IncrementBlock();
  }
}
