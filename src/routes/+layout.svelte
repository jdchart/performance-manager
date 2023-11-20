<script>
	// Import style sheets:
	import './reset.css';
	import './theme.css';

	// Import components:
    import TopNav from '$lib/components/ui/top-nav/TopNav.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

	// Language handling:
    import * as language from "$lib/scripts/language.js";
    import { lang } from '$lib/scripts/stores.js';
</script>

<svelte:head>
    <title>{language.get_term(["top_nav", "site_title"], $lang)}</title> 
</svelte:head>

<div id="global_container">
    <TopNav />
    
	<!-- Content goes here: -->
	<slot />
	
	<Footer />
</div>

<style>
	#global_container{
		background-color: white;
		height: 100%;
	}
</style>