<script lang="ts" setup>
import EmojiField from '@/components/EmojiField.vue';
import ArrowCircleRight from '@/assets/icons/arrow-circle-right.svg';
import { computed, inject, onMounted, ref } from 'vue';
import type { Emoji } from '@/types/Emoji';
import type { Entry } from '@/types/Entry';
import { userInjectionKey } from '@/InjectionKeys';

const random = (range = 1000) => Math.round(Math.random() * range);
const emit = defineEmits<{ (e: 'create', payload: Entry): void }>();

const text = ref('');
const emoji = ref<Emoji | null>(null);
const charCount = computed(() => text.value.length);
const textareaRef = ref<HTMLAreaElement | null>(null);
const maxChars = 280;
const handleCreate = () => {
  emit('create', { body: text.value, emoji: emoji.value, createdAt: new Date(), userId: 1, id: random() });
  text.value = "";
  emoji.value = null;
  textareaRef.value?.focus();
}
const handleText = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement;
  text.value = textarea.value;
};
const isValid = computed(() => text.value !== '' && emoji.value !== null);
const user = inject(userInjectionKey);
onMounted(() => {
  textareaRef.value?.focus();
});
</script>
<template>
  <form class="entry-form" @submit.prevent @submit="handleCreate">
    <textarea ref="textareaRef" :maxlength="maxChars" :value="text" @keyup="handleText"
      :placeholder="`New Journal Entry for ${user?.username ?? 'anonymous'}`"></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxChars }}</span>
      <button :disabled="!isValid" :class="{ disabled: !isValid }">
        Remember
        <ArrowCircleRight width="20" />
      </button>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.disabled {
  cursor: not-allowed;
}
</style>
