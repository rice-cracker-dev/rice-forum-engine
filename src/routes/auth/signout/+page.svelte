<script lang="ts">
  import { enhance } from '$app/forms';
  import AuthLayout from '../AuthLayout.svelte';
</script>

<AuthLayout>
  <h1>Logout</h1>
  <form method="post" use:enhance>
    <button>Continue</button>
  </form>
</AuthLayout>
