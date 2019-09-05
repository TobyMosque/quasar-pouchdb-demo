<template>
  <q-page class="q-pa-md">
    <q-table title="People" :data="people" :columns="columns" row-key="id" class="bg-grey-9">
      <template v-slot:top-left>
        <q-btn color="positive" icon="edit" label="create" to="/people/create" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td class="q-gutter-x-sm">
          <q-btn round outline color="primary" icon="edit" :to="'/people/' + props.value" />
          <q-btn round outline color="negative" icon="delete" @click="remove(props.row)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<style>
</style>

<script src="./Index.vue.js">
</script>
