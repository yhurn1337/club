import { error, fail, redirect } from "@sveltejs/kit";
import { validateData } from "$lib/utils";
import { updateEmailSchema } from "$lib/schemas";

export const actions = {
	resetPassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			updateEmailSchema,
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(formData.email);

            return {
                success: true
            }
		} catch (err) {
			return {
				formData,
				updateFailed: true
			}
		}
	}
};
