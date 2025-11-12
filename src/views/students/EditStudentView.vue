<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { AuthApi } from '@/data/apiService/authApi';
import Loader from '@/components/Loader.vue';
import { useLoader } from '@/composables/loader';
import { provide, watch } from 'vue';
import AlertDialog from '@/components/AlertDialog.vue';
import { useStudentsStore } from '@/stores/studentsStore';
import { StudentApi } from '@/data/apiService/studentsApi';
import { ChartNetwork } from 'lucide-vue-next';

// stores
const studentStore = useStudentsStore();

// composables
const { isLoading, changeLoadingStatus } = useLoader();
// validation
const formSchema = toTypedSchema(
    z.object({
        name: z.string().min(3).max(255).optional(),
        email: z.string().email().optional(),
        birthdate: z.string().optional(),
    })
);

const form = useForm({
    validationSchema: formSchema,
});

const { isSubmitting } = form;
// router
const router = useRouter();
const route = useRoute();

// methods
const onSubmit = form.handleSubmit(async (values) => {
    values = {
        name: values.name === undefined ? String(studentStore.student.name) : values.name,
        email: values.email === undefined ? String(studentStore.student.email) : values.email,
        birthdate:
            values.birthdate === undefined ? String(studentStore.student.class) : values.birthdate,
    };

    try {
        const response = await StudentApi.update({
            id: route.params.id,
            values,
        });

        if (response?.status === 204) {
            router.push('/students');
        }
    } catch (error) {}
});

watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id?: string | string[]) {
    await studentStore.fetchStudent({ id });
}

async function handelDelete() {
    try {
        changeLoadingStatus(true);
        const response = await StudentApi.delete({ id: route.params.id });
        if (response?.status === 204) {
            router.push('/students');
        }
    } finally {
        changeLoadingStatus(false);
    }
}
</script>

<template>
    <div class="h-full flex flex-col justify-center items-center gap-4">
        <div class="flex flex-col justify-center gap-4 items-center">
            <p class="text-3xl font-bold">Edit Student</p>
        </div>
        <form @submit="onSubmit" class="w-xl bg-white p-4 rounded-2xl border-4 flex flex-col gap-4">
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="enter student fullname"
                            v-bind="componentField"
                            v-model="studentStore.student.name"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="enter your email"
                            v-bind="componentField"
                            v-model="studentStore.student.email"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="birthdate">
                <FormItem>
                    <FormLabel>Birthdate</FormLabel>
                    <FormControl>
                        <Input
                            type="date"
                            placeholder="pick your birthdate"
                            v-bind="componentField"
                            v-model="studentStore.student.birthdate"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit">
                <Loader :loading="isSubmitting" />
                Update
            </Button>
            <AlertDialog @delete="handelDelete">
                <template #alertDialogue>
                    <Button variant="outline" class="w-full bg-red-400">
                        <Loader :loading="isLoading" />
                        Delete
                    </Button>
                </template>
            </AlertDialog>
        </form>
    </div>
</template>
