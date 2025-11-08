<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { onMounted, ref } from 'vue'
import Loader from '@/components/Loader.vue'
import { TeacherApi } from '@/data/apiService/teachersApi'
import { useRouter } from 'vue-router'
import TitleBar from '@/components/TitleBar.vue'
import { useClassesStore } from '@/stores/classesStore'

// stores
const classesStore = useClassesStore()

// validation
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    course: z.string(),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const { setErrors, isSubmitting, errors } = form
const isDisabled = ref(false)

// router
const router = useRouter()

// methods
const onSubmit = form.handleSubmit(async (values) => {
  try {
    /**
     * extend the values comes from
     */

    // TODO: get the user email from the local storage
    values = { ...values, ...{ user: 'beniane39@gmail.com' } }
    /**
     * disable save button while create a new teacher
     * make the button idempotent
     */
    isDisabled.value = true
    const response = await TeacherApi.create(values)

    if (response?.status === 201) {
      router.push('/teachers')
    } else if (response?.response?.status === 401) {
      setErrors({
        name: response.response.data.message,
      })
    }
  } catch (error) {
    console.log(error.response.data.message)
  } finally {
    isDisabled.value = false
  }
})

onMounted(async () => {
  try {
    await classesStore.fetchClasses()
  } catch (error) {
    console.log(error.response?.data?.message ?? 'something wrong')
  }
})
</script>

<template>
  <div
    class="place-items-center my-6 bg-white border-4 border-gray-300 rounded-2xl p-4 max-w-md mx-auto"
  >
    <TitleBar title="Create New Teacher" class="mb-2" />
    <form @submit="onSubmit" class="max-w-md w-full">
      <FormField v-slot="{ componentField }" name="name" class="">
        <FormItem class="mb-3">
          <FormLabel class="text-md">Name</FormLabel>
          <FormControl>
            <input
              type="text"
              placeholder="enter teacher fullname"
              v-bind="componentField"
              class="border-gray-400 border-2 rounded-lg px-2 py-2"
            />
          </FormControl>
          <FormMessage class="text-red-400 text-sm" />
        </FormItem>
      </FormField>
      <!-- email -->
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="mb-3">
          <FormLabel class="text-md font-bold">Email</FormLabel>
          <FormControl>
            <input
              type="text"
              placeholder="enter teacher email"
              v-bind="componentField"
              class="border-gray-400 border-2 rounded-lg px-2 py-2"
            />
          </FormControl>
          <FormMessage class="text-red-400 text-sm" />
        </FormItem>
      </FormField>
      <!-- password -->
      <FormField v-slot="{ componentField }" name="course">
        <FormItem class="mb-3">
          <FormLabel class="text-md font-bold">Course</FormLabel>
          <FormControl>
            <select
              id="course"
              placeholder="IT"
              v-bind="componentField"
              class="border-gray-400 border-2 rounded-lg px-2 py-2"
            >
              <option v-for="course in classesStore.classes" :key="course.id" :value="course.name">
                {{ course.name }}
              </option>
            </select>
          </FormControl>
          <FormMessage class="text-red-400 text-sm" />
        </FormItem>
      </FormField>
      <!-- errors -->
      <div class="mb-3 text-sm text-red-400">{{ errors[''] }}</div>
      <!-- submit -->
      <Button
        type="submit"
        class="text-white w-full flex justify-center items-center"
        :disabled="isDisabled"
      >
        <Loader :loading="isSubmitting" />
        <p>Submit</p>
      </Button>
    </form>
  </div>
</template>
