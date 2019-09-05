<template>
  <q-page class="q-pa-md">
    <q-card class="full-width bg-grey-9">
      <q-card-section>
        Person
      </q-card-section>
      <q-separator />
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="firstName" label="First Name" outlined />
        <q-input v-model="lastName" label="Last Name" outlined />
        <q-input v-model="email" label="Email" type="email" outlined />
        <q-select v-model="company" label="Company" map-options emit-value option-value="id" option-label="name" outlined :options="companies" />
        <q-select v-model="job" label="Job" map-options emit-value option-value="id" option-label="name" outlined :options="jobs" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="row q-px-md q-col-gutter-x-sm">
        <div class="col col-4">
          <q-btn class="full-width" color="grey-6" label="return" to="/people/" />
        </div>
        <div class="col col-8">
          <q-btn class="full-width" color="positive" label="save" @click="save" />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script src="./Index.vue.js">
</script>
