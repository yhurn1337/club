<script>
	import { Toaster } from 'svelte-french-toast'
</script>

<svelte:head>
	<link href="/styles/normalize.css" rel="stylesheet" />
	<link href="/styles/global.scss" rel="stylesheet" />
</svelte:head>
	
		
<Toaster />
<main>
	<slot  />
</main>