<script>
	import Input from "$lib/components/Input.svelte";

	export let form;
</script>

<div class="form">
	<form method="POST" action="?/resetPassword">
		<Input label="Email" name="email" type="email" placeholder="Email" required="true" value={form?.formData?.email ? form?.formData?.email : ""} errors={form?.errors?.email} />
		<button class="btn-primary" type="submit">Запросить пароль</button>
	</form>
    {#if form?.success}
		<div class="notification good">
			<p>Пароль отправлен на вашу почту</p>
		</div>
    {/if}
	<p>Еще не регистрировались? <a href="/register">Регистрация</a></p>
</div>

<style lang="scss">
	
	.form{
		display: flex;
		flex-direction: column;
		gap: 25px;
		p{
			color: #949494;
			a{
				color: #FF6600;
			}
		}
	}
	form{
		width   : 100%;
		display: flex;
		flex-direction: column;
		gap: 25px;
	}
	button{
		margin-top: 15px;
	}

	
</style>