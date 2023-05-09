<template>
  <div>
		<Card
			v-for="form in forms"
			:key="form.id.$oid"
			:form="form"
			@removeForm="removeForm"
		/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '../components/Card.vue'
import type { Form } from '@/types';

const forms = ref<Form[]>([])

const fetchForms = async () => {
	try {
		const response = await fetch('/src/mock/data.json');
		const data = await response.json();
		forms.value = data;
	} catch (error) {
		console.error('Error fetching forms:', error);
	}
}

fetchForms()

const removeForm = (id: string) => {
	forms.value = forms.value.filter((form) => form.id.$oid !== id)
}
</script>
