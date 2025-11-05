<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Title from '@/components/TitleBar.vue'
import { onMounted, reactive, ref } from 'vue'
import { ClassesApi } from '@/data/apiService/classes'
import Loader from '@/components/Loader.vue'
import { TeacherApi } from '@/data/apiService/teachers'
import { useRoute, useRouter } from 'vue-router'
import TitleBar from '@/components/TitleBar.vue'

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

const classes = ref([
  {
    id: 0,
    name: '',
  },
])

const router = useRouter()

const onSubmit = form.handleSubmit(async (values) => {
  try {
    /**
     * extend the values comes from
     */

    // TODO: get the user email from the local storage
    values = { ...values, ...{ user: 'beniane39@gmail.com' } }
    isDisabled.value = true
    const response = await TeacherApi.create(values)
    isDisabled.value = false
    if (response.status === 201) {
      router.push('/teachers')
    }
  } catch (error) {
    console.log(error.data.message)
    setErrors({
      name: error.data.message,
    })
  }
})

onMounted(async () => {
  try {
    const response = await ClassesApi.getAll()
    classes.value = response?.data
  } catch (error) {
    console.log(error.data.message)
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
              <option v-for="course in classes" :key="course.id" :value="course.name">
                {{ course.name }}
              </option>
            </select>
          </FormControl>
          <FormMessage class="text-red-400 text-sm" />
        </FormItem>
      </FormField>
      <!-- errors -->
      <div class="mb-3 text-sm text-red-400">{{ errors.name }}</div>
      <!-- submit -->
      <Button type="submit" class="text-white w-full flex justify-center items-center" :disabled="isDisabled">
        <Loader :loading="isSubmitting" />
        <p>Submit</p>
      </Button>
    </form>
  </div>
</template>
