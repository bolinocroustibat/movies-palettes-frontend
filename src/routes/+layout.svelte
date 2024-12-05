<script lang="ts">
import "../app.css"
import { onMount } from "svelte"
import { version } from "../../package.json"

onMount(() => {
	console.log(`App version: ${version}`)
})
</script>

<slot />
