<template>
  <div class="container">
    <div class="row justify-content-center text-left">
      <h1 class="col-lg-12 text-pink display-3">Send ZIL</h1>
      <p class="col-lg-12 text-warning">Only send ZIL to an Zilliqa address.</p>

      <form class="col">
        <div class="form-group">
          <label for="to">To address</label>
          <input type="text"
                 class="form-control bg-null"
                 id="to"
                 placeholder="To address"
                 v-model="toAddress">
          <small class="form-text text-danger"
                 v-if="!$v.toAddress.sameAs">{{addressMsg}}</small>
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number"
                 class="form-control bg-null"
                 id="amount"
                 v-model="amount">
         <small class="form-text text-danger"
                v-if="!$v.amount.sameAs">{{amounMsg}}</small>
        </div>
        <div class="form-group">
          <label for="gas">Gas Price (ZILs)</label>
          <input type="text"
                 class="form-control bg-null"
                 id="gas"
                 v-model="gas">
         <small class="form-text text-danger"
                v-if="!$v.gas.sameAs">{{gasMsg}}</small>
        </div>

        <button v-btn="'success'"
                :disabled="!$v.submitForm.sameAs"
                @click="txFormSubmit">SEND</button>
        <button v-btn="'danger m-2'"
                @click="$router.push({ name: 'home' })">REJECT</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { validation } from '@zilliqa-js/util'
import { validationMixin } from 'vuelidate'
import { fromZil } from '../filters/zil'
import { required, sameAs } from 'vuelidate/lib/validators'
import btn from '../directives/btn'

const ERRORCODE = [
  'This value cannot be less than 0!',
  'Insufficient funds!',
  'wrong zil address'
];

export default {
  directives: { btn },
  mixins: [validationMixin],
  name: 'Send',
  filters: { fromZil },
  data() {
    return {
      toAddress: '', addressMsg: null,
      amount: 0, amounMsg: null,
      gas: 0, gasMsg: null,
      submitForm: true
    };
  },
  validations: {
    amount: {
      required,
      sameAs: sameAs(vue => {
        if (+vue.amount < 0 || isNaN(+vue.amount)) {
          vue.amounMsg = ERRORCODE[0];
          return true;
        } else if (+vue.amount > +fromZil(vue.account.balance)) {
          vue.amounMsg = ERRORCODE[1];
          return true;
        }

        vue.amounMsg = null;

        return false;
      })
    },
    toAddress: {
      sameAs: sameAs(vue => {
        let isAddress = validation.isAddress(vue.toAddress);
        
        if (!isAddress || vue.toAddress.length < 40) {
          vue.addressMsg = ERRORCODE[2];
        } else {
          vue.addressMsg = null;
        }

        return isAddress;
      })
    },
    gas: {
      sameAs: sameAs(vue => {
        if (vue.gas <= 0 || isNaN(vue.gas) || vue.gas == '') {
          vue.gasMsg = ERRORCODE[0];
          return true;
        } else if (vue.gas > +fromZil(vue.account.balance)) {
          vue.gasMsg = ERRORCODE[1];
          return true;
        }

        vue.gasMsg = null;

        return false;
      })
    },
    submitForm: {
      sameAs: sameAs(vue => {
        return !vue.addressMsg &&
               !vue.amounMsg &&
               !vue.gasMsg;
      })
    }
  },
  computed: {
    ...mapState([
      'minGas'
    ]),
    ...mapState('storage', [
      'wallet'
    ]),

    account() {
      return this.wallet.identities[
        this.wallet.selectedAddress
      ];
    }
  },
  methods: {
    ...mapActions('storage', [
      'buildTransactions'
    ]),

    async txFormSubmit() {
      let data = {
        to: this.toAddress,
        amount: this.amount,
        gasPrice: this.gas
      };
      let tx = await this.buildTransactions(data);
      console.log(tx);
    }
  },
  mounted() {
    this.gas = fromZil(this.minGas);
  }
}
</script>

<style lang="scss">
// @import '../styles/colors';
</style>