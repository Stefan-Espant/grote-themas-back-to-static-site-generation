<script>
	import { onMount } from 'svelte';
	import Nav from '$lib/organisms/nav.svelte';
	import { page } from '$app/stores';

	import LoginOutButton from '../lib/organisms/LoginOutButton.svelte';
	import WerkvormCard from '../lib/organisms/WerkvormCard.svelte';
	import NavFilterList from '../lib/atoms/NavFilterList.svelte';
    import IncreaseTextToggle from '../lib/molecules/IncreaseTextToggle.svelte';

	export let data;

	let loading = false;

	const handleLogout = () => {
		loading = true;
		return async ({ result }) => {
			await invalidate('supabase:auth');
			await applyAction(result);
			loading = false;
		};
	};

	// Zoekbalk logica
	let searchInput = null;
	let filteredWerkvormen = data.werkvormen;

    function searchWerkvormen(event) {
      event.preventDefault();
      const searchTerm = searchInput.value.toLowerCase();
      filteredWerkvormen = data.werkvormen.filter((werkvorm) =>
          werkvorm.title.toLowerCase().includes(searchTerm)
      );
  }

	onMount(async () => {
		document.documentElement.classList.add('javascriptEnabled');

		const filterSearchButtons = document.querySelectorAll('#filterSearch');

		filterSearchButtons.forEach((filterSearchButton) => {
			const filterMegaMenu = document.querySelector('#mega-menu');
			filterSearchButton.addEventListener('click', () => {
				filterMegaMenu.classList.toggle('visible');
			});
		});

		searchInput = document.getElementById('search-werkvormen');

		// Voeg submit event listener toe voor het tonen van resultaten bij het indienen van het formulier
		searchInput.form.addEventListener('submit', searchWerkvormen);

		return () => {
			// Verwijder event listeners bij het opruimen van de component
			searchInput.form.removeEventListener('submit', searchWerkvormen);
		};
	});
</script>

<main>
	<Nav {data} />
    <NavFilterList {data} {filteredWerkvormen} {searchInput} {searchWerkvormen} />

	<!-- <LoginOutButton /> -->

	<section class="werkvormen" id="custom-view">
		{#each filteredWerkvormen as werkvorm}
			<WerkvormCard {werkvorm} {data} />
		{/each}
	</section>
</main>

<IncreaseTextToggle />

<style>
	.werkvormen {
		display: flex;
		flex-flow: row wrap;
		gap: 2rem;
		margin: 2rem 0;
	}

    #custom-view {
        transition: var(--animation-default) ease-in-out;
    }

	@media (min-width: 700px) {
		main {
			padding: 0 2rem;
		}
	}
</style>
