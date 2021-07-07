<template>
  <layout>
    <h4>DASHBOARD</h4>
    <div class="row g-3">
      <div class="col-md-4">
        <card bg_card="bg-primary">
          <template v-slot:card-body>
            <div class="container">
              <div class="d-flex justify-content-between">
                <div class="inner">
                  <h5 class="card-title">{{ tabungan }}</h5>
                  <h6 class="card-subtitle mb-2 text-white">Total Tabungan</h6>
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
                  <h5 class="card-title">{{ withdraw }}</h5>
                  <h6 class="card-subtitle mb-2 text-white">Total Withdraw</h6>
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
                  <h5 class="card-title">{{ deposit }}</h5>
                  <h6 class="card-subtitle mb-2 text-white">Total Deposit</h6>
                </div>
                <div class="icon">
                  <i class="bi bi-server icon-size"></i>
                </div>
              </div>
            </div>
          </template>
        </card>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="header-title">Chart Withdraw</h5>
          </div>
          <div class="card-body">
            <chart
              ref="wdChart"
              :type="withdrawChart.type"
              :data="withdrawChart.data"
            ></chart>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="header-title">chart Deposit</h5>
          </div>
          <div class="card-body">
            <chart
              ref="dpChart"
              :type="depositChart.type"
              :data="depositChart.data"
            ></chart>
          </div>
        </div>
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
import Layout from "./Layout.vue";
import Card from "@/components/Card.vue";
import Chart from "@/components/Chart.vue";
import { onMounted, reactive, toRefs, ref } from "vue";
import axios from "axios";
export default {
  components: {
    Layout,
    Card,
    Chart,
  },
  setup() {
    const wdChart = ref();
    const dpChart = ref();
    const total = reactive({
      tabungan: 0,
      withdraw: 0,
      deposit: 0,
    });
    const labels = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const withdrawChart = reactive({
      type: "bar",
      data: {
        labels: labels,
        datasets: [],
      },
    });
    const depositChart = reactive({
      type: "bar",
      data: {
        labels: labels,
        datasets: [],
      },
    });
    const formatIDR = (nominal) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(nominal);
    const loadTotalTabungan = async () => {
      try {
        const res = await axios.get(`/api/dashboard`);
        const json = res.data.data;
        total.tabungan = formatIDR(+json.total_tabungan);
        total.withdraw = formatIDR(+json.total_withdraw);
        total.deposit = formatIDR(+json.total_deposit);
        withdrawChart.data.datasets.push({
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: json.perbulan_withdraw,
        });
        depositChart.data.datasets.push({
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: json.perbulan_deposit,
        });
      } catch (err) {
        console.error(err);
      }
    };
    // console.log(withdrawChart);

    onMounted(async () => {
      await loadTotalTabungan();
      wdChart.value.loadChart();
      dpChart.value.loadChart();
    });
    return {
      ...toRefs(total),
      withdrawChart,
      depositChart,
      dpChart,
      wdChart,
    };
  },
};
</script>
