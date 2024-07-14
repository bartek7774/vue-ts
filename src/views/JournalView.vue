<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import EntryEditor from '@/components/EntryEditor.vue';
import EntryCard from '@/components/EntryCard.vue';
import type { Entry } from '@/types/Entry';
import { reactive } from 'vue';
const entries = reactive<Entry[]>([])
const handleCreateEntry = (e: Entry) => {
  console.log(e);
  entries.push(e);
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
