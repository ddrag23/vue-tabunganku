<template>
  <layout>
    <h4>HOME</h4>
    <div class="row g-3">
      <div class="col-md-4">
        <card bg_card="bg-primary">
          <template v-slot:card-body>
            <div class="container">
              <div class="d-flex justify-content-between">
                <div class="inner">
                  <h5 class="card-title">{{ total }}</h5>
                  <h6 class="card-subtitle mb-2 text-white">
                    Total Tabungan
                  </h6>
                </div>
                <div class="icon">
                  <i class="bi bi-server icon-size"></i>
                </div>
              </div>
            </div>
          </template>
        </card>
      </div>
      <div class="col-md-4">
        <card bg_card="bg-danger">
          <template v-slot:card-body>
            <div class="container">
              <div class="d-flex justify-content-between">
                <div class="inner">
                  <h5 class="card-title">{{ totalWithdraw }}</h5>
                  <h6 class="card-subtitle mb-2 text-white">
                    Total Withdraw
                  </h6>
                </div>
                <div class="icon">
                  <i class="bi bi-server icon-size"></i>
                </div>
              </div>
            </div>
          </template>
        </card>
      </div>
      <div class="col-md-4">
        <card bg_card="bg-success">
          <template v-slot:card-body>
            <div class="container">
              <div class="d-flex justify-content-between">
                <div class="inner">
                  <h5 class="card-title">{{ totalDeposit }}</h5>
                  <h6 class="card-subtitle mb-2 text-white">
                    Total Deposit
                  </h6>
                </div>
                <div class="icon">
                  <i class="bi bi-server icon-size"></i>
                </div>
              </div>
            </div>
          </template>
        </card>
      </div>
    </div>
  </layout>
</template>
<style type="text/css" media="screen">
.card-title {
  font-size: 2rem;
  color: white;
}
.icon-size {
  font-size: 4rem;
  opacity: 0.5;
}
</style>
<script>
import Layout from './Layout.vue';
import Card from '@/components/Card.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
export default {
  components: {
    Layout,
    Card,
  },
  setup() {
    const total = ref(0);
    const totalWithdraw = ref(0);
    const totalDeposit = ref(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const loadTotalTabungan = async () => {
      try {
        const res = await axios.get(`/api/savings/show/${user.id}`);
        const json = res.data;
        total.value = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(+json.saldo);
      } catch (err) {
        console.error(err);
      }
    };
    const handleTotalWithdraw = async () => {
      try {
        const res = await axios.get(`/api/withdraw/count/${user.id}`);
        const json = res.data;
        totalWithdraw.value = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(+json);
      } catch (err) {
        console.error(err);
      }
    };
    const handleTotalDeposit = async () => {
      try {
        const res = await axios.get(`/api/deposit/count/${user.id}`);
        const json = res.data;
        totalDeposit.value = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(+json);
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      loadTotalTabungan();
      handleTotalWithdraw();
      handleTotalDeposit();
    });
    return {
      total,
      totalWithdraw,
      totalDeposit,
    };
  },
};
</script>
