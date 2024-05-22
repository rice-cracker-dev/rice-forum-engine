<script lang="ts">
  import { enhance } from '$app/forms';
</script>

<form method="post" use:enhance>
  <label class="label">
    <span>To</span>
    <input name="to" type="text" class="input" value="ricecracker2234@gmail.com" required />
  </label>
  <label class="label">
    <span>Subject</span>
    <input name="subject" type="text" class="input" required />
  </label>
  <label class="label">
    <span>Content</span>
    <textarea name="text" class="textarea" rows="6" required />
  </label>
  <button type="submit" class="variant-filled-surface btn">submit</button>
</form>
