<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = '';
	export let placeholder = '';
	export let label;
	export let name;
	export let type = 'text';
	export let disabled = false;
	export let required = false;
	export let radioLabel = false;
	export let checked

	export let errors;
	
	function handleChange(event) {
		errors = '';
	}

	function dispatchValue() {
		dispatch('radioChanged', value); 
	}

	let stringRequired = required ? '<span style="color: #FF6600;">*</span>' : '';
</script>


<div>
	{#if radioLabel}
		
		<div class="radio-button">
			<input class:errors {checked} {type} {name} id={value}  {value} {placeholder} {required} {disabled} on:change={dispatchValue}/>
			
			<label for={value}>
			
				{label} {@html stringRequired}
				
			</label>
			
			{#if errors}
				<label class="input-error" for={name}>{errors} </label>
			{/if}

		</div>
		
	{:else}
	
		<label for={name}>
			{label} {@html stringRequired}
		</label>

		<input on:input={handleChange} class:errors {name} {type} {value} {placeholder} {required} {disabled}/>

		{#if errors}
			<label class="input-error" for={name}>{errors} </label>
		{/if}

	{/if}
</div>

<style lang="scss">
	div{
		display: flex;
		flex-direction: column;
		gap: 8px;
		position: relative;
		input{
			&.errors{
				border-color: red;
			}
			accent-color: #FF6600;
			
		}
	}
	.radio-button{
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;

		&:has(input[type="radio"].checked){
			.radio-handle{
				background-color: #FF6600;
				&::before{
					background-color: #fff;
					opacity: 1;
				}
			}
		}
		input[type="radio"] {
			display: none;
		}

		label {
			position: relative;
			padding-left: 25px;
			&::before{
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				transform: translatey(-50%);
				width: 14px;
				height: 14px;
				display: inline-block;
				background-color: #0F0F0F;
				border: 0.5px solid #727272;
				border-radius: 50%;
				cursor: pointer;
				transition: all 0.3s ease;
			}
			&::after{
				content: '';
				position: absolute;
				top: 50%;
				left: 3.5px;
				transform: translatey(-50%);
				width: 7px;
				height: 7px;
				display: inline-block;
				background-color: transparent;
				border-radius: 50%;
				cursor: pointer;
			}
		}

		input[type="radio"]:checked + label::after {
			background-color: transparent;
		}
		input[type="radio"]:checked + label::before {
			border: 3px solid #FF6600;
		}
		
	}
	
	
</style>