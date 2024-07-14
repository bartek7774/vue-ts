<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import EntryEditor from '@/components/EntryEditor.vue';
import EntryCard from '@/components/EntryCard.vue';
import type { Entry } from '@/types/Entry';
import { reactive } from 'vue';
import { useGlobalProperties } from '@/composables/useGlobalProperties';
const entries = reactive<Entry[]>([]);
const { $http } = useGlobalProperties();
const handleCreateEntry = (e: Entry) => {
  console.log(e);
  entries.push(e);
  $http.post('https://mock.httpstatus.io/201', {
    ...e
  });
};
</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @create="handleCreateEntry" />
    <ul>
      <li v-for="entry in entries" :key="entry.id">
        <EntryCard :item="entry" />
      </li>
    </ul>
  </main>
</template>
