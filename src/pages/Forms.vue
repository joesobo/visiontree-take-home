<template>
  <div>
		<div class="mb-4 flex flex-1 bg-white p-4 shadow sm:rounded-lg">
			<label for="search-field" class="sr-only">Search</label>
			<MagnifyingGlassIcon class="h-full w-5 text-gray-400" aria-hidden="true" />
			<input v-model="search" id="search-field" class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." type="search" name="search" />
		</div>

		<form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
			<div class="p-4 sm:p-8">
				<h2 class="mb-4 text-base font-semibold leading-7 text-gray-900">Add Form</h2>

				<div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
					<div class="sm:col-span-4">
						<label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
						<div class="mt-2">
							<div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
								<input v-model="newName" type="text" name="name" id="name" class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
							</div>
						</div>
					</div>

					<div class="sm:col-span-4">
						<label for="url" class="block text-sm font-medium leading-6 text-gray-900">URL</label>
						<div class="mt-2">
							<div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
								<input v-model="newUrl" type="url" name="url" id="url" class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
							</div>
						</div>
					</div>

					<div class="sm:col-span-4">
						<label for="type" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
						<div class="mt-2">
							<div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
								<select v-model="newType" name="type" id="type" class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
									<option value="standard">Standard</option>
									<option value="clinical">Clinical</option>
									<option value="patient">Patient</option>
								</select>
							</div>
						</div>
					</div>

					<p class="mt-2 text-sm font-medium leading-6 text-red-500 sm:col-span-4">{{ error }}</p>
				</div>
			</div>
			<div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 p-4 sm:px-8">
				<button type="button" @click="clearForm" class="text-sm font-semibold leading-6 text-gray-900">Clear</button>
				<button type="button" @click="saveForm" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
			</div>
		</form>

		<Card
			v-for="form in displayForms"
			:key="form.id.$oid"
			:form="form"
			@removeForm="removeForm"
		/>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Card from '../components/Card.vue'
import type { Form } from '@/types'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { v4 as uuidv4 } from 'uuid'

const forms = ref<Form[]>([])

const search = ref('')
const newName = ref('')
const newUrl = ref('')
const newType = ref('')
const error = ref('')

const fetchForms = async () => {
	try {
		const response = await fetch('/src/mock/data.json')
		const data = await response.json()
		forms.value = data
	} catch (error) {
		console.error('Error fetching forms:', error)
	}
}

fetchForms()

const removeForm = (id: string) => {
	forms.value = forms.value.filter((form) => form.id.$oid !== id)
}

const displayForms = computed(() => forms.value.filter((form) => form.form_name.toLowerCase().includes(search.value.toLowerCase())))

const clearForm = () => {
	newName.value = ''
	newUrl.value = ''
	newType.value = ''
	error.value = ''
}

const saveForm = () => {
	if (!newName.value || !newUrl.value || !newType.value) {
		error.value = 'Please fill out all fields.'
		return
	}

	const newForm: Form = {
		id: {
			$oid: uuidv4()
		},
		form_name: newName.value,
		form_url: newUrl.value,
		last_update: new Date().toISOString(),
		type: newType.value,
	}

	forms.value = [...forms.value, newForm]

	clearForm()
}

watch([newName, newUrl, newType], () => {
	error.value = '';
});
</script>
