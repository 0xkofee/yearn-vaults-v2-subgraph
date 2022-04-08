import { Address, ethereum, BigInt } from '@graphprotocol/graph-ts';
import { createMockedFunction, log } from 'matchstick-as';
import { Vault } from '../../generated/Registry/Vault';
import { Token } from '../../generated/schema';
import { defaults } from '../default';
import { fatalTestError } from '../util';
import { GenericStateStub } from './genericStateStub';
import { TokenStub } from './tokenStateStub';

export class VaultStub extends GenericStateStub {
  static DefaultAddress: string = defaults.vaultAddress;

  static DefaultVaultStub(): VaultStub {
    return new VaultStub(
      null, // total supply
      null, // total assets
      null, // total debt
      null, // price per share
      null, // performance fee
      null, // management fee
      null, // activation
      null, // apiVersion
      null, // rewards address
      TokenStub.DefaultToken(VaultStub.DefaultAddress),
      TokenStub.DefaultToken(TokenStub.DefaultTokenAddress)
    );
  }

  private _totalSupply: string;
  public get totalSupply(): string {
    return this._totalSupply;
  }
  public set totalSupply(value: string) {
    this._updateStubField<BigInt>('totalSupply', value);
    this._totalSupply = value;
  }

  private _totalAssets: string;
  public get totalAssets(): string {
    return this._totalAssets;
  }
  public set totalAssets(value: string) {
    this._updateStubField<BigInt>('totalAssets', value);
    this._totalAssets = value;
  }

  private _totalDebt: string;
  public get totalDebt(): string {
    return this._totalDebt;
  }
  public set totalDebt(value: string) {
    this._updateStubField<BigInt>('totalDebt', value);
    this._totalDebt = value;
  }

  private _pricePerShare: string;
  public get pricePerShare(): string {
    return this._pricePerShare;
  }
  public set pricePerShare(value: string) {
    this._updateStubField<BigInt>('pricePerShare', value);
    this._pricePerShare = value;
  }

  private _performanceFee: string;
  public get performanceFee(): string {
    return this._performanceFee;
  }
  public set performanceFee(value: string) {
    this._updateStubField<BigInt>('performanceFee', value);
    this._performanceFee = value;
  }

  private _managementFee: string;
  public get managementFee(): string {
    return this._managementFee;
  }
  public set managementFee(value: string) {
    this._updateStubField<BigInt>('managementFee', value);
    this._managementFee = value;
  }

  private _activation: string;
  public get activation(): string {
    return this._activation;
  }
  public set activation(value: string) {
    this._updateStubField<BigInt>('activation', value);
    this._activation = value;
  }

  private _apiVersion: string;
  public get apiVersion(): string {
    return this._apiVersion;
  }
  public set apiVersion(value: string) {
    this._updateStubField<string>('apiVersion', value);
    this._apiVersion = value;
  }

  private _rewardsAddress: string;
  public get rewardsAddress(): string {
    return this._rewardsAddress;
  }
  public set rewardsAddress(value: string) {
    this._updateStubField<Address>('rewards', value);
    this._rewardsAddress = value;
  }

  shareToken: TokenStub;
  wantToken: TokenStub;

  clone(): VaultStub {
    return new VaultStub(
      this.totalSupply,
      this.totalAssets,
      this.totalDebt,
      this.pricePerShare,
      this.performanceFee,
      this.managementFee,
      this.activation,
      this.apiVersion,
      this.rewardsAddress,
      this.shareToken,
      this.wantToken
    );
  }

  constructor(
    totalSupply: string | null,
    totalAssets: string | null,
    totalDebt: string | null,
    pricePerShare: string | null,
    performanceFee: string | null,
    managementFee: string | null,
    activation: string | null,
    apiVersion: string | null,
    rewardsAddress: string | null,
    shareToken: TokenStub,
    wantToken: TokenStub
  ) {
    super(shareToken.address);
    this.shareToken = shareToken;
    this.wantToken = wantToken;

    if (totalSupply) {
      this._totalSupply = totalSupply;
    } else {
      this._totalSupply = '0';
    }
    if (totalAssets) {
      this._totalAssets = totalAssets;
    } else {
      this._totalAssets = '0';
    }
    if (totalDebt) {
      this._totalDebt = totalDebt;
    } else {
      this._totalDebt = '0';
    }
    if (pricePerShare) {
      this._pricePerShare = pricePerShare;
    } else {
      this._pricePerShare = '1000000000000000000';
    }
    if (performanceFee) {
      this._performanceFee = performanceFee;
    } else {
      this._performanceFee = '1000';
    }
    if (managementFee) {
      this._managementFee = managementFee;
    } else {
      this._managementFee = '200';
    }
    if (activation) {
      this._activation = activation;
    } else {
      this._activation = '0';
    }
    if (apiVersion) {
      this._apiVersion = apiVersion;
    } else {
      this._apiVersion = '0.0.0';
    }
    if (rewardsAddress) {
      this._rewardsAddress = rewardsAddress;
    } else {
      this._rewardsAddress = defaults.treasuryAddress;
    }

    // update stubs by triggering each field's setter
    this.totalAssets = this._totalAssets;
    this.totalSupply = this._totalSupply;
    this.totalDebt = this._totalDebt;
    this.pricePerShare = this._pricePerShare;
    this.performanceFee = this._performanceFee;
    this.managementFee = this._managementFee;
    this.activation = this._activation;
    this.apiVersion = this._apiVersion;

    // these don't have setters so we directly update them
    this._updateStubField<Address>('token', this.wantToken.address);
    this._updateStubField<Address>('rewards', this.rewardsAddress);
  }
}
