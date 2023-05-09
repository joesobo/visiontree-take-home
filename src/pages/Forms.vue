<template>
  <div>
		<div class="my-2 mb-8 flex flex-1 bg-gray-100 p-2 shadow sm:rounded-lg">
			<label for="search-field" class="sr-only">Search</label>
			<MagnifyingGlassIcon class="h-full w-5 text-gray-400" aria-hidden="true" />
			<input v-model="search" id="search-field" class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." type="search" name="search" />
		</div>

		<Card
			v-for="form in filteredForms"
			:key="form.id.$oid"
			:form="form"
			@removeForm="removeForm"
		/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Card from '../components/Card.vue'
import type { Form } from '@/types'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const forms = ref<Form[]>([])
const filteredForms = ref<Form[]>([])

const search = ref('')

const fetchForms = async () => {
	try {
		const response = await fetch('/src/mock/data.json')
		const data = await response.json()
		forms.value = data
		filteredForms.value = data
	} catch (error) {
		console.error('Error fetching forms:', error)
	}
}

fetchForms()

const removeForm = (id: string) => {
	forms.value = forms.value.filter((form) => form.id.$oid !== id)
	filteredForms.value = forms.value
}

watch(search, newSearch => {
	filteredForms.value = forms.value.filter((form) => form.form_name.toLowerCase().includes(newSearch.toLowerCase()))
})
</script>
