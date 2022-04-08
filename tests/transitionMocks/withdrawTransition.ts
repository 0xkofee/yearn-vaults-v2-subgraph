import {
  handleWithdraw,
  handleWithdrawEvent,
} from '../../src/mappings/vaultMappings';
import { MockBlock } from '../triggerMocks/mockBlock';
import {
  MockWithdrawCall,
  MockWithdrawEvent,
} from '../triggerMocks/mockWithdraw';
import { VaultStub } from '../stubs/vaultStateStub';
import { GenericWithdrawTransition } from './genericWithdrawTransition';

export class WithdrawCallTransition extends GenericWithdrawTransition {
  mockCall: MockWithdrawCall;

  constructor(
    preWithdrawStub: VaultStub,
    tokensWithdrawn: string,
    sharesBurned: string,
    recipient: string
  ) {
    super(preWithdrawStub, tokensWithdrawn, sharesBurned, recipient);

    // create call
    this.mockCall = new MockWithdrawCall(
      this.recipient,
      this.sharesBurnt,
      this.tokensWithdrawn,
      this.postWithdrawStub,
      null,
      null
    );

    handleWithdraw(this.mockCall.mock);

    MockBlock.IncrementBlock();
  }
}

export class WithdrawEventTransition extends GenericWithdrawTransition {
  mockEvent: MockWithdrawEvent;

  constructor(
    preWithdrawStub: VaultStub,
    tokensWithdrawn: string,
    sharesBurned: string,
    recipient: string
  ) {
    super(preWithdrawStub, tokensWithdrawn, sharesBurned, recipient);

    // create call
    this.mockEvent = new MockWithdrawEvent(
      this.recipient,
      this.sharesBurnt,
      this.tokensWithdrawn,
      this.postWithdrawStub,
      null,
      null
    );

    handleWithdrawEvent(this.mockEvent.mock);

    MockBlock.IncrementBlock();
  }
}
