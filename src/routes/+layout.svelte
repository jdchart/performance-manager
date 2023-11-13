<script>
	import './reset.css';
	import './theme.css';

    import TopNav from '$lib/components/ui/top-nav/TopNav.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

	// Language handling:
    import { lang } from '$lib/scripts/stores.js';
    let current_language;
	lang.subscribe(value => {
		current_language = value;
	});
    import page_vocab from '$lib/data/vocab/general.json';
</script>

<svelte:head>
    <title>{page_vocab.top_nav.site_title[current_language]}</title> 
</svelte:head>

<div id="global_container">
    <TopNav />
    <slot />
	<Footer />
</div>

<style>
	#global_container{
		background-color: white;
		height: 100%;
	}
</style>