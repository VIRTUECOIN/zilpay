<template>
  <Container :class="b()">
    <div :class="b('sender-recipient')">
      <P
        v-tooltip="copytitle"
        :size="SIZE_VARIANS.xs"
        :content="account.address | toAddress(addressFormat, false)"
        copy
        @copy="onCopyMixin"
      >
        {{ account.address | toAddress(addressFormat) }}
      </P>
      <Arrow
        height="10"
        width="2"
        right
      />
      <P
        v-tooltip="copytitle"
        :size="SIZE_VARIANS.xs"
        :content="transaction.toAddr | toAddress(addressFormat, false)"
        copy
        @copy="onCopyMixin"
      >
        {{ transaction.toAddr | toAddress(addressFormat) }}
      </P>
    </div>
    <Separator />
    <ul :class="b('info-list')">
      <li
        v-for="(el, index) of infoList"
        :key="index"
        :class="b('info-item')"
      >
        <P
          :size="SIZE_VARIANS.xs"
          :font="FONT_VARIANTS.bold"
        >
          {{ el.key }}
        </P>
        <P
          v-tooltip="copytitle"
          :class="b('value')"
          :size="SIZE_VARIANS.xs"
          :content="el.value"
          :font="FONT_VARIANTS.regular"
          copy
          @copy="onCopyMixin"
        >
          {{ el.value }}
        </P>
      </li>
    </ul>
    <div
      :class="b('viewblock')"
      @click="onViewblockTx(transaction.TranID)"
    >
      <Title :size="SIZE_VARIANS.sm">
        Viewblock
      </Title>
      <Icon
        src="/illustrations/viewblock-logo.png"
        height="40"
        width="40"
        :type="ICON_TYPE.auto"
      />
    </div>
  </Container>
</template>

<script>
import { mapState } from 'vuex'

import { SIZE_VARIANS, FONT_VARIANTS, ICON_TYPE } from '@/config'

import P from '@/components/P'
import Title from '@/components/Title'
import Container from '@/components/Container'
import Separator from '@/components/Separator'
import Icon from '@/components/Icon'
import Arrow from '@/components/icons/Arrow'

import { toAddress, fromZil, toConversion } from '@/filters'
import CopyMixin from '@/mixins/copy'
import viewblockMixin from '@/mixins/viewblock'

/**
 * Show more information about transaction.
 * @example
 * import TransactionDetails from '@/components/TransactionDetails'
 * <TransactionDetails
 *   :account="getCurrentAccount"
 *   :transaction="selectedTx"
 * />
 */
export default {
  name: 'TransactionDetails',
  components: {
    Container,
    Separator,
    Arrow,
    Icon,
    Title,
    P
  },
  mixins: [CopyMixin, viewblockMixin],
  filters: { toAddress, fromZil, toConversion },
  props: {
    account: {
      type: Object,
      required: true
    },
    transaction: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      SIZE_VARIANS,
      FONT_VARIANTS,
      ICON_TYPE
    }
  },
  computed: {
    ...mapState('settings', ['addressFormat']),

    infoList() {
      return [
        {
          key: 'Info',
          value: this.transaction.Info
        },
        {
          key: 'Hash',
          value: this.transaction.TranID
        },
        {
          key: 'Nonce',
          value: this.transaction.nonce
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.TransactionDetails {
  /* top | right | bottom | left */
  padding: 10px 15px 30px 15px;

  &__sender-recipient {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__info-list {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-top: 15px;
  }

  &__info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid var(--theme-color-separator);
  }

  &__value {
    max-width: 200px;
  }

  &__viewblock {
    display: flex;
    align-items: center;
    float: right;

    cursor: pointer;

    padding-top: 15px;
    padding-bottom: 15px;
  }
}
</style>