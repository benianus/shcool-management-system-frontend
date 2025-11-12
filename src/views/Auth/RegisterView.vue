<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RouterLink } from 'vue-router';
import { AuthApi } from '@/data/apiService/authApi';
import router from '@/router';
import { useLoader } from '@/composables/loader';
import Loader from '@/components/Loader.vue';

const { isLoading, changeLoadingStatus } = useLoader();

const formSchema = toTypedSchema(
    z
        .object({
            name: z.string().max(255),
            email: z.string().email().max(255).toLowerCase(),
            password: z.string(),
            password_confirmation: z.string(),
        })
        .refine((data) => data.password === data.password_confirmation, {
            message: 'The password field confirmation does not match.',
            path: ['password_confirmation'],
        })
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    try {
        changeLoadingStatus(true);
        const response = await AuthApi.register({ credentials: values });
        if (response?.status === 201) {
            router.push({ name: 'home' });
        }
    } catch (error) {
        console.log(error.response.data);
    } finally {
        changeLoadingStatus(false);
    }
});
</script>

<template>
    <div class="h-full flex flex-col justify-center items-center gap-4">
        <div class="flex flex-col justify-center gap-4 items-center">
            <p class="text-3xl font-bold">Create your account</p>
            <p class="text-gray-400">Join our community of learners and educators</p>
        </div>
        <form @submit="onSubmit" class="w-xl bg-white p-4 rounded-2xl border-4 flex flex-col gap-4">
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="enter your fullname"
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
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="enter you password"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password_confirmation">
                <FormItem>
                    <FormLabel>Password confirmation</FormLabel>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="enter you password confirmation"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Button type="submit"><Loader :loading="isLoading" /> Register </Button>
            <div class="flex justify-center gap-2 items-center">
                <p>Already have an account?</p>
                <RouterLink :to="{ name: 'login' }" class="text-blue-500 hover:underline text-sm">
                    Sing in?
                </RouterLink>
            </div>
        </form>
    </div>
</template>
