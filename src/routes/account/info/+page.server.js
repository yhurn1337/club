import { error, fail, redirect } from "@sveltejs/kit";
import { validateData, serializeNonPOJOs } from "$lib/utils";
import { personalDataSchema, shippingAddressSchema, dealerSchema, kennelDataScheme } from "$lib/schemas";
import { serialize } from "object-to-formdata";


const imageTypes = [
	'image/jpg',
	'image/png',
	'image/webp',
	'application/pdf'
];


export const actions = {
	personalData: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			personalDataSchema,
		);
		
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
		} catch (err) {
			console.log('Error: ', err.message);
			return {
				formData,
				loginFailed: true
			}
		}

        return {
            formData,
            filled: true
        }
	},
    shippingAddress: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			shippingAddressSchema,
		);
		
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
		} catch (err) {
			console.log('Error: ', err.message);
			return {
				formData,
				loginFailed: true
			}
		}

        return {
            formData,
            filled: true
        }
	},
    dealer: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			dealerSchema,
		);
		
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
		} catch (err) {
			console.log('Error: ', err.message);
			return {
				formData,
				loginFailed: true
			}
		}

        return {
            formData,
            filled: true
        }
	},
    cats: async ({ request, locals }) => {
		const body = await request.formData();

		

		const formData = Object.fromEntries(body)

		const { cats_kennel_sertificate, ...rest } = formData

		if (cats_kennel_sertificate?.size === 0) {
			formData.cats_kennel_sertificate = null;
		}
		
		
		try{
			if(cats_kennel_sertificate){
				let typeCorrect = cats_kennel_sertificate?.type && imageTypes.includes(cats_kennel_sertificate.type) ? true : false;
				let sizeCorrect = cats_kennel_sertificate?.size < 5000000 ? true : false;

				if (!typeCorrect && cats_kennel_sertificate.size !== 0) {
					return fail(400, { 
						message: 'Недоступный формат. Поддерживаемые форматы: jpg, png, webp, pdf' 
					}) 
				} else if (!sizeCorrect && cats_kennel_sertificate.size !== 0) {
					return fail(400, { 
						message: 'Слишком большой файл, допустимый размер 5мб' 
					})
				}
			}

			try {
				await locals.pb.collection('users').update(locals.user.id, serialize(formData));
				return {
					rest,
					filled: true
				}
				
			} catch (error) {
				console.log('Error: ', error);
				return fail(400,{
					rest
				})
			}
		} catch(err) {
			console.log('Error: ', err);
			return fail(400, {
				formData: rest,
				errors: err
			});
		}

		
	},
	dogs: async ({ request, locals }) => {
		const body = await request.formData();
		const formData = Object.fromEntries(body)

		const { dogs_kennel_sertificate, ...rest } = formData

		if (dogs_kennel_sertificate?.size === 0) {
			formData.dogs_kennel_sertificate = null;
		}
		
		
		try{
			
			if(dogs_kennel_sertificate){
				let typeCorrect = dogs_kennel_sertificate?.type && imageTypes.includes(dogs_kennel_sertificate.type) ? true : false;
				let sizeCorrect = dogs_kennel_sertificate?.size < 5000000 ? true : false;

				if (!typeCorrect && dogs_kennel_sertificate?.size !== 0) {
					throw { 
						code: '400', 
						message: 'Недоступный формат. Поддерживаемые форматы: jpg, png, webp, pdf' 
					};
				} else if (!sizeCorrect && dogs_kennel_sertificate?.size !== 0) {
					throw { 
						code: '400', 
						message: 'Слишком большой файл, допустимый размер 5мб' 
					};
				}
			}

			
			try {
				await locals.pb.collection('users').update(locals.user.id, serialize(formData));
				return {
					rest,
					filled: true
				}
				
			} catch (error) {
				console.log('Error: ', error);
				return {
					rest,
					loginFailed: true
				}
			}
		} catch(err) {
			console.log('Error: ', err);
			return fail(400, {
				formData: rest,
				errors: err
			});
		}

		
	},
	professional: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData())

		try {
			await locals.pb.collection('users').update(locals.user.id, formData);
		} catch (err) {
			console.log('Error: ', err.message);
			return {
				formData
			}
		}

        return {
            formData,
            filled: true
        }
	},
};