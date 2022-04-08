import {
  handleDeposit,
  handleDepositEvent,
  handleDepositWithAmount,
  handleDepositWithAmountAndRecipient,
} from '../../src/mappings/vaultMappings';
import { defaults } from '../default';
import { MockBlock } from '../triggerMocks/mockBlock';
import {
  MockDepositCall,
  MockDepositEvent,
  MockDepositWithAmountAndRecipientCall,
  MockDepositWithAmountCall,
} from '../triggerMocks/mockDeposit';
import { VaultStub } from '../stubs/vaultStateStub';
import { GenericDepositTransition } from './genericDepositTransition';

export class DepositCallTransition extends GenericDepositTransition {
  mockCall: MockDepositCall;

  constructor(
    preDepositStub: VaultStub,
    tokensDeposited: string,
    sharesMinted: string,
    senderAddress: string
  ) {
    super(preDepositStub, tokensDeposited, sharesMinted, senderAddress, false);

    this.mockCall = new MockDepositCall(
      defaults.senderAddress,
      this.tokensDeposited,
      this.postDepositStub,
      null,
      null
    );

    handleDeposit(this.mockCall.mock);

    MockBlock.IncrementBlock();
  }
}

export class DepositWithAmountCallTransition extends GenericDepositTransition {
  mockCall: MockDepositWithAmountCall;

  constructor(
    preDepositStub: VaultStub,
    tokensDeposited: string,
    sharesMinted: string,
    recipient: string,
    suppressMinimumBalanceErrors: boolean
  ) {
    super(
      preDepositStub,
      tokensDeposited,
      sharesMinted,
      recipient,
      suppressMinimumBalanceErrors
    );

    this.mockCall = new MockDepositWithAmountCall(
      recipient,
      sharesMinted,
      tokensDeposited,
      this.postDepositStub,
      null,
      null
    );

    handleDepositWithAmount(this.mockCall.mock);

    MockBlock.IncrementBlock();
  }
}

export class DepositWithAmountAndRecipientCallTransition extends GenericDepositTransition {
  mockCall: MockDepositWithAmountAndRecipientCall;

  constructor(
    preDepositStub: VaultStub,
    tokensDeposited: string,
    sharesMinted: string,
    recipient: string,
    benefactor: string
  ) {
    super(preDepositStub, tokensDeposited, sharesMinted, recipient, false);

    this.mockCall = new MockDepositWithAmountAndRecipientCall(
      recipient,
      benefactor,
      sharesMinted,
      tokensDeposited,
      this.postDepositStub,
      null,
      null
    );

    handleDepositWithAmountAndRecipient(this.mockCall.mock);

    MockBlock.IncrementBlock();
  }
}

export class DepositEventTransition extends GenericDepositTransition {
  mockEvent: MockDepositEvent;

  constructor(
    preDepositStub: VaultStub,
    tokensDeposited: string,
    sharesMinted: string,
    senderAddress: string
  ) {
    super(preDepositStub, tokensDeposited, sharesMinted, senderAddress, false);

    this.mockEvent = new MockDepositEvent(
      senderAddress,
      this.tokensDeposited,
      this.sharesMinted,
      this.postDepositStub,
      null,
      null
    );

    handleDepositEvent(this.mockEvent.mock);

    MockBlock.IncrementBlock();
  }
}
