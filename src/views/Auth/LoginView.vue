<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RouterLink, useRouter } from 'vue-router'
import { AuthApi } from '@/data/apiService/authApi'
import Loader from '@/components/Loader.vue'
import { useAuthStore } from '@/stores/authStore'
import { useLoader } from '@/composables/loader'

// stores
const authStore = useAuthStore()

// composables
const { isLoading, changeLoadingStatus } = useLoader()
// validation
const formSchema = toTypedSchema(
  z.object({
    email: z.string().email().default('beniane39@gmail.com'),
    password: z.string().default('12345678'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

// router
const router = useRouter()

// router.beforeEach(async (to, form) => {
//   if (!authStore.isAuthenticated && to.name !== 'login') {
//     return { name: 'home' }
//   }
// })

// methods
const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values)
  try {
    changeLoadingStatus(true)
    const response = await AuthApi.login({ credentials: values })
    if (response?.status === 200) {
      router.push({ name: 'home' })
    }
  } catch (error) {
    console.log(error.response.data.message)
  } finally {
    changeLoadingStatus(false)
  }
})
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center gap-4">
    <div class="flex flex-col justify-center gap-4 items-center">
      <p class="text-3xl font-bold">Welcome back</p>
      <p class="text-gray-400">Login to continue to your dashboard</p>
    </div>
    <form @submit="onSubmit" class="w-xl bg-white p-4 rounded-2xl border-4 flex flex-col gap-4">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" placeholder="enter your email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="enter you password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex justify-end">
        <RouterLink to="#" class="text-blue-500 hover:underline text-sm"
          >Forgot Password?</RouterLink
        >
      </div>
      <Button type="submit">
        <Loader :loading="isLoading" />
        Login
      </Button>
      <div class="flex justify-center gap-2 items-center">
        <p>Don't have an account?</p>
        <RouterLink to="/register" class="text-blue-500 hover:underline text-sm">
          Sing up?
        </RouterLink>
      </div>
    </form>
  </div>
</template>
