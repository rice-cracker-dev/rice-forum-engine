<script lang="ts">
  import type { ActionData } from './$types';
  import { enhance } from '$app/forms';
  import { validatePassword, validateUsername } from '$lib/validations';
  import ValidationInput from '$lib/components/ValidationInput.svelte';
  import AuthLayout from '../AuthLayout.svelte';

  export let form: ActionData;

  let username = '';
  let password = '';
  let usernameValid = false;
  let passwordValid = false;

  $: isFormValid = usernameValid && passwordValid;
</script>

<AuthLayout message={form?.message}>
  <div slot="header">
    <h1 class="h4 font-semibold">Sign up</h1>
    <p>
      <span class="opacity-75">Have an account?</span>
      <a href="/auth/signin" class="anchor">Sign in</a>
    </p>
  </div>

  <form method="post" class="flex flex-col items-stretch gap-4" use:enhance>
    <ValidationInput
      name="username"
      validate={validateUsername}
      bind:value={username}
      on:validated={(e) => (usernameValid = e.detail.validated)}
    >
      Username
    </ValidationInput>
    <ValidationInput
      name="password"
      type="password"
      validate={validatePassword}
      bind:value={password}
      on:validated={(e) => (passwordValid = e.detail.validated)}
    >
      Password
    </ValidationInput>
    <button type="submit" class="variant-filled-surface btn" disabled={!isFormValid}>Sign up</button
    >
  </form>
</AuthLayout>
