import * as React from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from 'components/ui/Button/Button';
import TextInput from 'components/ui/TextInput/TextInput';
import { isValidAddress } from 'services/web3';

interface IProps {
  afterSubmit: () => void;
}
const WalletAddressForm: React.FunctionComponent<IProps> = ({
  afterSubmit,
}) => {
  const router = useRouter();

  const {
    register,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ walletAddress }: any): Promise<any> => {
    router.push(`/address/${walletAddress}`);
    reset();
    clearErrors();
    afterSubmit();
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        className="block font-sans w-full text-sm bg-creepz-green-light creepz-glowy-shadow text-creepz-green-dark placeholder-creepz-green-dark placeholder-opacity-60 focus:outline-none px-2"
        label="Wallet address"
        placeholder="Enter wallet address"
        type="search"
        error={errors.walletAddress}
        {...register('walletAddress', {
          validate: (value: string) =>
            isValidAddress(value) ? true : 'Enter a valid address',
        })}
      />
      <Button
        className="bg-creepz-green-light text-black w-full flex justify-center uppercase"
        type="submit"
      >
        View
      </Button>
    </form>
  );
};

export default WalletAddressForm;
