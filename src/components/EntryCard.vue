<script lang="ts" setup>
interface Props {
  item: Entry, other?: String
}

import type { Entry } from '@/types/Entry';
import DateDisplay from './DateDisplay.vue';
import UseEmojis from '@/composables/UseEmojis';
import { inject } from 'vue';
import { userInjectionKey } from '@/InjectionKeys';
defineProps<Props>();
const { findEmoji } = UseEmojis();
const user = inject(userInjectionKey);
</script>
<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <component width="75" :is="findEmoji(item.emoji)"></component>
      <div class="entry-text">{{ other }}: {{ item.body }}</div>
    </div>
    <div class="entry-footer">
      <DateDisplay :date="item.createdAt" class="mr-2" />
      |
      <span class="ml-2"> {{ user?.username }}</span>
    </div>
  </div>
</template>
