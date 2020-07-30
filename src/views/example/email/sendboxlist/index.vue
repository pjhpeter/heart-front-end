<template>
  <div>
    <sendbox-table />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SendboxTable from "../../../../components/example/email/sendboxlist/SendboxTable.vue";

@Component({
  name: "sendbox-list",
  components: {
    SendboxTable
  }
})
export default class SendboxList extends Vue {}
</script>
