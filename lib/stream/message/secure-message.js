/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2019 ZilPay
 */
import { Message } from './message'

/**
 * Can send encrypted msg.
 * @example
 * import { v4 } from 'uuid'
 * import { EncryptedStream } from 'lib/stream'
 * import { SecureMessage } from 'lib/stream/message'
 * let stream = new EncryptedStream('instance-name', uuid())
 * const msg = { type: '@/secuere/msg/example', payload: {} }
 * const message = new SecureMessage(msg)
 *   .send(stream, '#/any/reciever')
 *   .then(() => / Do something... /)
 */
export class SecureMessage extends Message {

  constructor(msg) {
    super(msg)
  }

  /**
   * Method for send message.
   * @param {Object} stream - Encrypted stream.
   * @param {String} recipient - String recipient (conten.js, inpage.js).
   */
  send(stream, recipient) {
    return stream.send(this, recipient)
  }

}
