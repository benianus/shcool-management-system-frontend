<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RouterLink, useRouter } from 'vue-router';
import { AuthApi } from '@/data/apiService/authApi';
import Loader from '@/components/Loader.vue';
import { useLoader } from '@/composables/loader';

// stores

// composables
const { isLoading, changeLoadingStatus } = useLoader();
// validation
const formSchema = toTypedSchema(
    z.object({
        name: z.string().min(3).max(255).default('Mohamed BENIANE'),
        email: z.string().email().default('beniane39@gmail.com'),
        birthdate: z.string(),
    })
);

const form = useForm({
    validationSchema: formSchema,
});

// router
const router = useRouter();

// methods
const onSubmit = form.handleSubmit(async (values) => {
    console.log('Form submitted!', values);
});
</script>

<template>
    <div class="h-full flex flex-col justify-center items-center gap-4">
        <div class="flex flex-col justify-center gap-4 items-center">
            <p class="text-3xl font-bold">Add New Student</p>
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
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="enter your email" v-bind="componentField" />
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
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit">
                <Loader :loading="isLoading" />
                Save
            </Button>
        </form>
    </div>
</template>
