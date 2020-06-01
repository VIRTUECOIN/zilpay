/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2019 ZilPay
 */
export const DEFAULT = {
  ZERO: 0,
  TIME_BEFORE_LOCK: 3, // Number in hour.
  DEFAULT_HOURS_LOCK: [
    1,
    2,
    3,
    4,
    5
  ],
  BLOCKS_FOR_CONFIRM: 101, // For DS block need 100 tx blocks.
  MAX_TX_AMOUNT_LIST: 10,
  MIN_LENGTH_PASSWORD: 6,
  MAX_LENGTH_NAME: 10,
  POPUP_CALL_TIMEOUT: 60000,
  POPUP_WIDTH: 360,
  POPUP_HEIGHT: 600,
  PROMT_PAGE: 'popup.html',
  UD_CONTRACT_ADDRESS: 'zil1jcgu2wlx6xejqk9jw3aaankw6lsjzeunx2j0jz'
}
