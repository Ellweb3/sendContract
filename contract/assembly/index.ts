/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { context, logging, storage,  ContractPromiseBatch, u128 } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

// export function setGreeting(message: string, amount: number): void {
//   const accountId = Context.sender
//   // Use logging.log to record logs permanently to the blockchain!
//   logging.log(`Saving greeting "${message}" for account "${accountId}"`)
//   storage.set(accountId, message)

// }
export function sendNear(receiver: string): boolean {
// const yoctoNear: u128  = u128.from(amount*1000000000000000000000000)
  const rec = ContractPromiseBatch.create(receiver)
  const owner = ContractPromiseBatch.create('adalo.testnet')
  const fee:u128 = u128.from('250000000000000000000000');
  // const feePercent:u128 = u128.from('1000000000000000000000000');
  
  // const feeAmount:u128 = u128.rem(context.attachedDeposit,feePercent)
  
  const payment:u128 = u128.sub(context.attachedDeposit, fee)

  rec.transfer(payment)
  owner.transfer(fee)
  

return true
}
// export function setGreeting(message: string,receiver: string, amount: f64):string {
//   const accountId = Context.sender
//   // Use logging.log to record logs permanently to the blockchain!
//   logging.log(`Saving greeting "${message}" for account "${accountId}"`)
//   storage.set(accountId, message)
//   const yoctoNear: u128  = u128.from(amount*1000000000000000000000000)
//     const rec = ContractPromiseBatch.create(receiver)
//   const status: string = ""
//   rec.transfer(yoctoNear)
  
//   return status
// }