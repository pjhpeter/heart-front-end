<template>
  <div>
    <inbox-table />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import InboxTable from "../../../../components/example/email/inboxlist/InboxTable.vue";

@Component({
  name: "inbox-list",
  components: {
    InboxTable
  }
})
export default class Inboxlist extends Vue {}
</script>
