<script lang="ts">
	export let addComment: (id: number, comment: string) => void;
	export let idx: number;

	let comment: string;
</script>

<form>
	<input bind:value={comment} />
	<button on:click={() => addComment(idx, comment)}>Add comment</button>
</form>
