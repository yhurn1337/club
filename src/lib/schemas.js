import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email({ message: 'Введите корректный Email' }),
	password: z.string({ required_error: 'Пароль обязателен' })
});

export const registerUserSchema = z
	.object({
		email: z
			.string({ required_error: 'Email обязателен' })
			.email({ message: 'Введите корректный Email' }),
		password: z
			.string({ required_error: 'Пароль обязателен' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Пароль должен длинее 8 символов и содержать как минимум 1 латинскую букву, 1 цифру и 1 специальный символ'
			}),
		passwordConfirm: z
			.string({ required_error: 'Подтверждение пароля обязательно' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
				'Пароль должен длинее 8 символов и содержать как минимум 1 латинскую букву, 1 цифру и 1 специальный символ'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Пароль и Подтверждение пароля должны совпадать',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Пароль и Подтверждение пароля должны совпадать',
				path: ['passwordConfirm']
			});
		}
	});

const imageTypes = [
	'image/jpg',
	'image/png',
	'image/webp',
	'application/pdf'
];

export const sertificateSchema = z.object({
	dogs_kennel_sertificate: z
	  .any()
	  .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
	  .refine(
		(file) => imageTypes.includes(file?.type),
		'Недоступный формат. Поддерживаемые форматы: jpg, png, webp, pdf'
	  ),
	cats_kennel_sertificate: z
	  .any()
	  .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
	  .refine(
		(file) => imageTypes.includes(file?.type),
		'Недоступный формат. Поддерживаемые форматы: jpg, png, webp, pdf'
	  )
})

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email({ message: 'Введите корректный Email' })
});

export const personalDataSchema = z.object({
	name: z
		.string({ required_error: 'Имя обязательно' })
		.regex(/^[а-яА-Я]+$/, { message: 'Имя может состоять только из кириллических букв' }),
	surname: z
		.string({ required_error: 'Фамилия обязательно' })
		.regex(/^[а-яА-Я]+$/, { message: 'Фамилия может состоять только из кириллических букв' }),
	thirdname: z
		.string({ required_error: 'Отчество обязательно' })
		.regex(/^[а-яА-Я]+$/, { message: 'Отчество может состоять только из кириллических букв' }),
	phone: z
		.string({ required_error: 'Телефон обязателен' })
});

export const shippingAddressSchema = z.object({
	country: z
		.string({ required_error: 'Страна обязательна' })
		.regex(/^[а-яА-Я.,\/#!$%\^&\*;:{}=\-_`~()\s]+$/, { message: 'Страна может состоять только из кириллических букв' }),
	state: z
		.string({ required_error: 'Область обязательна' })
		.regex(/^[а-яА-Я.,\/#!$%\^&\*;:{}=\-_`~()\s]+$/, { message: 'Область может состоять только из кириллических букв' }),
	city: z
		.string({ required_error: 'Город обязателен' })
		.regex(/^[а-яА-Я.,\/#!$%\^&\*;:{}=\-_`~()\s]+$/, { message: 'Город может состоять только из кириллических букв' }),
	address: z
		.string({ required_error: 'Адрес обязателен' })
		.regex(/^[а-яА-Я0-9.,\/#!$%\^&\*;:{}=\-_`~()\s]+$/, { message: 'Адрес может состоять только из кириллических букв, цифр и знаков препинания' }),
});

export const dealerSchema = z.object({
	dealer: z
		.string({ required_error: 'Поставщик обязателен' })
		.regex(/^[а-яА-Я.,\/#!$%\^&\*;:{}=\-_`~()\s]+$/, { message: 'Имя поставщика может состоять только из кириллических букв и знаков препинания' }),
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Old password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

const ImageTypesSchema = z.enum(imageTypes)
export const kennelDataScheme = z.object({
	cats_kennel_sertificate: z
		.instanceof(File)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (!ImageTypesSchema.safeParse(val.type).success) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Недоступный формат. Поддерживаемые форматы: jpg, png, webp, pdf'
					});
				}

				return val;
			}
		}),
	dogs_kennel_sertificate: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				console.log('val:', val.type)

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Недоступный формат. Поддерживаемые форматы: jpg, png, webp, pdf'
					});
				}

				return val;
			}
		}),
});
