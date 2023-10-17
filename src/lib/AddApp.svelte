<script lang="ts">
	export let addApp: (name: string, author: string) => void;

	let name: string;
	let author: string;
</script>

<form>
	<h1>Add new app</h1>

	<div class="labels">
		<label>
			App name:
			<input bind:value={name} />
		</label>

		<label>
			Author:
			<input bind:value={author} />
		</label>
	</div>

	<button on:click={() => addApp(name, author)}>Add app</button>
</form>

<style>
	.labels {
		display: flex;
        flex-direction: column;
	}
</style>
