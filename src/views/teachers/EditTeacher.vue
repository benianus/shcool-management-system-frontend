<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { onMounted, reactive, ref } from 'vue'
import { ClassesApi } from '@/data/apiService/classes'
import Loader from '@/components/Loader.vue'
import { TeacherApi } from '@/data/apiService/teachers'
import { useRoute, useRouter } from 'vue-router'
import TitleBar from '@/components/TitleBar.vue'
import { useTeacherStore } from '@/stores/teachers'

// stores
const teacherStore = useTeacherStore()

// zod & vee-validate form
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
    course: z.string().optional(),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const { setErrors, errors, isSubmitting } = form

// states
const classes = ref([
  {
    id: 0,
    name: '',
  },
])

// vue router
const router = useRouter()
const route = useRoute()

// methods
const onSubmit = form.handleSubmit(async (values) => {
  try {
    console.log(values)

    /**
     * handle undefined value in case of regret of modifying item
     */
    values = {
      name: values.name === undefined ? String(teacherStore.teacher.name) : values.name,
      email: values.email === undefined ? String(teacherStore.teacher.email) : values.email,
      course: values.course === undefined ? String(teacherStore.teacher.class) : values.course,
    }

    const response = await TeacherApi.update({
      id: route.params.id,
      values,
    })

    if (response?.status === 200) {
      router.push('/teachers')
    }
  } catch (error) {
    console.log(error.response.data.message)
    setErrors({
      name: error.response.data.message,
    })
  }
})

async function deleteTeacher() {
  try {
    console.log('Delete')
    const response = await TeacherApi.delete({ id: route.params.id })
    if (response?.status === 200) {
      router.push('/teachers')
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  try {
    await teacherStore.showTeacher({ id: route.params.id })
    const courses = await ClassesApi.getAll()
    classes.value = courses?.data
  } catch (error) {
    console.log(error.data.message)
  }
})
</script>

<template>
  <div
    class="place-items-center my-6 bg-white border-4 border-gray-300 rounded-2xl p-4 max-w-md mx-auto flex flex-col gap-2"
  >
    <TitleBar title="Edit Teacher" class="mb-2" />
    <form @submit="onSubmit" class="flex flex-col max-w-lg w-full mx-auto">
      <FormField v-slot="{ componentField }" name="name" class="">
        <FormItem class="mb-3">
          <FormLabel class="text-md font-bold">Name</FormLabel>
          <FormControl>
            <input
              type="text"
              placeholder="enter teacher fullname"
              v-bind="componentField"
              class="border-gray-400 border-2 rounded-lg px-2 py-2"
              v-model="teacherStore.teacher.name"
            />
          </FormControl>
          <FormMessage class="text-red-400 text-sm" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="mb-3">
          <FormLabel class="text-md font-bold">Email</FormLabel>
          <FormControl>
            <input
              type="text"
              placeholder="enter teacher email"
              v-bind="componentField"
              class="border-gray-400 border-2 rounded-lg px-2 py-2"
              v-model="teacherStore.teacher.email"
            />
          </FormControl>
          <FormMessage class="text-red-400 text-sm" />
        </FormItem>
      </FormField>
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
      <Button type="submit" class="text-white w-full flex justify-center items-center">
        <Loader :loading="isSubmitting" />
        <p>Update</p>
      </Button>
    </form>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-error rounded-md w-full" onclick="my_modal_2.showModal()">Delete</button>
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Delete Teacher</h3>
        <p class="py-4">
          <span class="font-bold">Note: </span> Press ESC key or click outside to Cancel
        </p>
        <form class="float-right" @submit.prevent="deleteTeacher">
          <button class="btn rounded-md">
            <Loader :loading="isSubmitting" />
            <p>Confirm</p>
          </button>
        </form>
        <form method="dialog" class="modal-backdrop float-right mx-2.5">
          <button class="btn rounded-md">close</button>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
