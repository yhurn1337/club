import { error, fail, redirect } from "@sveltejs/kit";
import { validateData, generateUsername } from "$lib/utils";
import { registerUserSchema } from "$lib/schemas";

export const actions = {
	register: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			registerUserSchema,
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			});
		}

		let username = generateUsername(formData.email.split(' ').join('')).toLowerCase();
		try {
			await locals.pb.collection('users').create({ username, ...formData });
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err) {
			console.log('Error: ', err);
			return fail(400,{
				formData,
				registerFailed: true,
				errors: err.message,
			});
		}

		throw redirect(303, '/login');
	}
};
