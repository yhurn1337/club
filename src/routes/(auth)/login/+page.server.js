import { error, fail, redirect } from "@sveltejs/kit";
import { validateData } from "$lib/utils";
import { loginUserSchema } from "$lib/schemas";

export const actions = {
	login: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			loginUserSchema,
		);
		

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);

            if(!locals.pb?.authStore?.model?.verified) {
                locals.pb.authStore.clear()
                return fail(400, {
					formData,
                    notVerified: true
                });
            }
		} catch (err) {
			console.log('Error: ', err.message);
			return fail(400, {
				formData,
				loginFailed: true
			});
		}

		throw redirect(303, '/');
	}
};
