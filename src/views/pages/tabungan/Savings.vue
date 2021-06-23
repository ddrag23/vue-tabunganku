<template>
  <layout>
    <div class="row">
      <div class="col">
        <card>
          <template v-slot:card-body>
            <vue-table>
              <template v-slot:thead>
                <tr>
                  <th>ok</th>
                  <th>ok</th>
                  <th>ok</th>
                </tr>
              </template>
              <template v-slot:tbody>
                <tr>
                  <td>ok</td>
                  <td>ok</td>
                  <td>ok</td>
                </tr>
              </template>
            </vue-table>
          </template>
        </card>
      </div>
    </div>
    <h3>ini halaman Tabungan</h3>
  </layout>
</template>
<script>
import Layout from "../Layout.vue";
import VueTable from "../../../components/Table.vue";
import Card from "../../../components/Card.vue";
export default {
  name: "Savings",
  components: {
    Layout,
    VueTable,
    Card,
  },
};
</script>
