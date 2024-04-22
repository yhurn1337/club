<script>
	import Input from "$lib/components/Input.svelte";
	import { enhance } from "$app/forms";
  	import toast from "svelte-french-toast";

	export let form;

	const submitForm = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Успешно!');
					await update()
					break;
				case 'redirect':
					toast.success('Успешно!');
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
	<form method="POST" action="?/login" use:enhance={submitForm}>
		<Input label="Email" name="email" type="email" placeholder="Email"  errors="{form?.errors?.email}" required="true" value={form?.data?.email ? form?.data?.email : ""} />
		<Input label="Пароль" name="password" type="password" placeholder="Пароль" errors="{form?.errors?.password}" required="true" />

		{#if form?.notVerified}
			<div class="notification">
				<p>Необходимо подтвердить email</p>
			</div>
		{/if}
		{#if form?.loginFailed}
			<div class="notification">
				<p>Не удалось войти. Проверьте правильность ввода данных.</p>
			</div>
		{/if}
		<button class="btn-primary" type="submit">Войти</button>
	</form>
	<p>Еще не регистрировались? <a href="/register">Регистрация</a></p>
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