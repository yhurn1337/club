<script>
	import Input from "$lib/components/Input.svelte";
	import { enhance } from "$app/forms";
  	import toast from "svelte-french-toast";
	export let form

	const submitForm = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Успешно! Подтвердите свою почту для завершения регистрации и войдите в аккаунт', { duration: 6000 })
					await update()
					break;
				case 'redirect':
					toast.success('Успешно! Подтвердите свою почту для завершения регистрации и войдите в аккаунт', { duration: 6000 });
					await update()
					break;
				case 'fail':
					toast.error('Что-то пошло не так, попробуйте снова', { duration: 1500 })
					break;
				default:
					console.log(result)
					toast.error('Что-то пошло не так, попробуйте снова', { duration: 1500 })
					await update()
					break;
			}
		}
	}
</script>

<div class="form">
	<form action="?/register" method="POST" use:enhance={submitForm}>
		<Input label="Email" name="email" type="email" placeholder="Email" required="true" value={form?.data?.email ? form?.data?.email : ""} errors="{form?.errors?.email}" />
		<Input label="Пароль" name="password" type="password" placeholder="Пароль" required="true" errors="{form?.errors?.password}" />
		<Input label="Пароль" name="passwordConfirm" type="password" placeholder="Пароль" required="true" errors="{form?.errors?.passwordConfirm}" />

		{#if form?.registerFailed}
			<div class="notification">
				<p>Что-то пошло не так, попробуйте снова</p>
			</div>
		{/if}
		<button class="btn-primary" type="submit">Регистрация</button>
	</form>
	<p>Забыли пароль? <a href="/change-password">Восстановить пароль</a></p>

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

		div{
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	}
	button{
		margin-top: 15px;
	}

	
</style>