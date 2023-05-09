<template>
	<!-- Base Component reference: https://tailwindui.com/components/application-ui/data-display/description-lists#component-e1b5917b21bbe76a73a96c5ca876225f -->

	<div class="my-2 overflow-hidden bg-white shadow sm:rounded-lg">
		<div class="px-4 py-6 sm:px-6">
			<div class="flex justify-between">
				<h3 class="text-base font-semibold leading-7 text-gray-900">{{ form.form_name }}</h3>
				<button @click="removeForm" class="cursor-pointer">
					<XMarkIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
				</button>
			</div>
			<a :href="form.form_url" target="_blank" rel="noopener noreferrer" class="mt-1 max-w-2xl text-sm leading-6 text-gray-500 hover:underline">
				Click For More Details
			</a>
		</div>
		<div class="border-t border-gray-100">
			<dl class="divide-y divide-gray-100">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-900">ID</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ form.id.$oid }}</dd>
				</div>
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-900">Last Updated</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ form.last_update }}</dd>
				</div>
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-900">Type</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ form.type }}</dd>
				</div>
			</dl>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import type { Form } from '@/types'

const props = defineProps<{
	form: Form
}>()

const emit = defineEmits<{
	(e: 'removeForm', id: string): void
}>()

const removeForm = () => {
	emit('removeForm', props.form.id.$oid)
}
</script>
