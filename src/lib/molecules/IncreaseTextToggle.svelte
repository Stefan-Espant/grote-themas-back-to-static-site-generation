<script>
	import { onMount } from 'svelte';
    import AccessilbleTextIcon from '$lib/atoms/AccessilbleTextIcon.svelte';

    onMount(async () => {
        // Vergroot de tekst op de site
        const textIncrease = document.querySelector('#textIncrease')

        textIncrease.addEventListener('click', () => {
            document.documentElement.classList.toggle('text-large')
        })
    })
</script>

<button id="textIncrease">
    <figure>
        <AccessilbleTextIcon />
        <figcaption>vergroot tekst</figcaption>
    </figure>

</button>

<style>
    button {
        position: fixed;
        bottom: 32px;
        right: 40px;
        padding: 0.25rem 0.5rem;
        padding-left: 12px;
        background-color: var(--color-hva-pink-enhanced);
        border: unset;
        color: var(--color-default);
        box-shadow: 0.5rem 0.5rem #1e1649;
        transition: 0.3s ease-in-out;
        z-index: 5;
    }

    button figure {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        text-transform: capitalize;
    }

    button figure figcaption {
        visibility: hidden;
        width: 0px;
    }

    /* Interactive states */
    button:hover {
        background-color: var(--color-hva-blue-secundary-enhanced);
        box-shadow: 0px 0px #1e1649;
        transition: 0.3s ease-in-out;
    }

    @media (min-width: 40rem){

        button {
            padding-left: 0.5rem;
        }

        button figure figcaption {
            visibility: visible;
            width: fit-content;
        }
    }


</style>