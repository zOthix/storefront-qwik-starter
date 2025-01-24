import { $, component$, useSignal } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import XCircleIcon from '~/components/icons/XCircleIcon';
import { registerCustomerAccountMutation } from '~/providers/shop/account/account';

export default component$(() => {
	const navigate = useNavigate();
	const email = useSignal('');
	const firstName = useSignal('');
	const lastName = useSignal('');
	const password = useSignal('');
	const confirmPassword = useSignal('');
	const businessName = useSignal('');
	const vat = useSignal('');
	const address = useSignal('');
	const businessPhone = useSignal('');
	const contactPersonPhone = useSignal('');
	const fax = useSignal('');
	const accountingPhone = useSignal('');
	const accountingEmail = useSignal('');
	const managerAddress = useSignal('');
	const successSignal = useSignal(false);
	const error = useSignal('');

	const registerCustomer = $(async (): Promise<void> => {
		if (
			email.value === '' ||
			firstName.value === '' ||
			lastName.value === '' ||
			password.value === '' ||
			businessName.value === '' ||
			vat.value === '' ||
			address.value === '' ||
			businessPhone.value === '' ||
			contactPersonPhone.value === '' ||
			accountingPhone.value === '' ||
			accountingEmail.value === '' ||
			managerAddress.value === ''
		) {
			error.value = 'All fields are required';
		} else if (password.value !== confirmPassword.value) {
			error.value = 'Passwords do not match';
		} else {
			error.value = '';
			successSignal.value = false;

			const { registerCustomerAccount } = await registerCustomerAccountMutation({
				input: {
					emailAddress: email.value,
					firstName: firstName.value,
					lastName: lastName.value,
					password: password.value,
					accountingEmail: accountingEmail.value,
					accountingPhone: accountingPhone.value,
					address: address.value,
					businessName: businessName.value,
					businessPhone: businessPhone.value,
					contactPersonPhone: contactPersonPhone.value,
					fax: fax.value,
					managerAddress: managerAddress.value,
					vat: vat.value,
				},
			});
			if (registerCustomerAccount.__typename === 'Success') {
				successSignal.value = true;
				window.scrollTo({ top: 0, left: 0 });
				setTimeout(() => {
					navigate('/sign-in');
				}, 1000);
			} else {
				error.value = registerCustomerAccount.message;
			}
		}
	});

	return (
		<div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8 scroll-smooth">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 class="mt-6 text-center text-3xl text-gray-900">{$localize`Create a new account`}</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					{$localize`Or`}{' '}
					<Link href="/sign-in" class="font-medium text-primary-600 hover:text-primary-500">
						{$localize`login to your existing account`}
					</Link>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div class="mb-6 bg-yellow-50 border border-yellow-400 text-yellow-800 rounded p-4 text-center text-sm">
						{successSignal.value ? (
							<p>{$localize`Please wait for admin to verify your email before logging in.`}</p>
						) : (
							<p>{$localize`Please fill the form.`}</p>
						)}
					</div>
					<div class="space-y-6">
						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Email address`}</label>
							<div class="mt-1">
								<input
									type="email"
									autoComplete="email"
									value={email.value}
									required
									onInput$={(_, el) => (email.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`First name`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={firstName.value}
									required
									onInput$={(_, el) => (firstName.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Last name`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={lastName.value}
									required
									onInput$={(_, el) => (lastName.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Password`}</label>
							<div class="mt-1">
								<input
									type="password"
									value={password.value}
									required
									onInput$={(_, el) => (password.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Repeat Password`}</label>
							<div class="mt-1">
								<input
									type="password"
									value={confirmPassword.value}
									required
									onInput$={(_, el) => (confirmPassword.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Business name`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={businessName.value}
									required
									onInput$={(_, el) => (businessName.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`VAT number / Company number`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={vat.value}
									required
									onInput$={(_, el) => (vat.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Address`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={address.value}
									required
									onInput$={(_, el) => (address.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Business phone`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={businessPhone.value}
									required
									onInput$={(_, el) => (businessPhone.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Contact person phone`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={contactPersonPhone.value}
									required
									onInput$={(_, el) => (contactPersonPhone.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Fax`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={fax.value}
									required
									onInput$={(_, el) => (fax.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Accounting phone`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={accountingPhone.value}
									required
									onInput$={(_, el) => (accountingPhone.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Accounting email`}</label>
							<div class="mt-1">
								<input
									type="email"
									autoComplete="email"
									value={accountingEmail.value}
									required
									onInput$={(_, el) => (accountingEmail.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">{$localize`Manager address`}</label>
							<div class="mt-1">
								<input
									type="text"
									value={managerAddress.value}
									required
									onInput$={(_, el) => (managerAddress.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						{error.value !== '' && (
							<div class="rounded-md bg-red-50 p-4">
								<div class="flex">
									<div class="flex-shrink-0">
										<XCircleIcon />
									</div>
									<div class="ml-3">
										<h3 class="text-sm font-medium text-red-800">
											{$localize`We ran into a problem signing you up!`}
										</h3>
										<p class="text-sm text-red-700 mt-2">{error.value}</p>
									</div>
								</div>
							</div>
						)}
						<div>
							<button
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								onClick$={registerCustomer}
							>
								{$localize`Sign up`}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
