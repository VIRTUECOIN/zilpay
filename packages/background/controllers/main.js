/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2019 ZilPay
 */
import { AccountControl, NetworkControl, SocketControl } from 'packages/background/services'

let accountControl = new AccountControl()
let networkControl = new NetworkControl()
let socketControl = new SocketControl(networkControl)

export {
  accountControl,
  networkControl,
  socketControl
}
