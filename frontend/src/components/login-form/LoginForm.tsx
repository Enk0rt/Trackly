import Form from "next/form";
import Image from "next/image";
import { MainBtn } from "@/components/ui/main-btn/MainBtn";
import { TypeBtnEnum } from "@/enums/typeBtnEnum";

const LoginForm = () => {
    return (
        <div className=' max-w-[300px]  mx-auto gradient transform-[translateY(30%)]  shadow-xl rounded-[18px]'>
            <Form action={''} className='px-[34px] py-[24px] flex flex-col  items-center
            '>

                <Image src='/svg/app-logo.svg' alt='App logo icon' width={40} height={40}/>

                <h3 className='mt-2 text-[#34684F] dark:text-[#FFFFFF] text-[20px] font-medium'>Sign in to TrackLy</h3>

                <div className='w-full mt-6'>
                    <label htmlFor="login" className='flex flex-col gap-1  font-light'>
                        <span className='opacity-[.6]  dark:opacity-40 text-[14px] dark:text-[#FFFFFF]'>Username or email address</span>
                        <input type="text" name='login' className='pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10  outline-[#34684F]/80 dark:focus:outline-[#FFFFFF]/50 rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90'/>
                    </label>

                    <label htmlFor="password" className="flex flex-col gap-1  mt-1 font-light">
                        <span className="opacity-[.6]  dark:opacity-40 text-[14px] dark:text-[#FFFFFF]">Password</span>
                        <input type="password" name="password"
                               className="pl-3 py-1 border border-[#34684F]/10 dark:border-[#FFFFFF]/10 outline-[#34684F]/80 dark:outline-[#FFFFFF]/50 rounded-md  font-medium text-[#33674E] dark:text-[#FFFFFF]/90" />
                    </label>

                </div>

                <MainBtn
                    type={TypeBtnEnum.BTN}
                    path={'/sign-in'} className='bg-[#34684F] text-[#FFFFFF] text-[16px] mt-8'>
                    Sign in
                </MainBtn>

                <a className='mt-4 opacity-[.4] text-[12px] dark:text-[#FFFFFF]/90'>Forgot password</a>

                <div className='mt-1 flex gap-1 text-[12px]'>
                    <p className='opacity-[.4] dark:text-[#FFFFFF]/76'>Don`t have account?</p>
                    <a href="/sign-up" className='opacity-[.8] dark:text-[#FFFFFF]/90'>Sign up</a>
                </div>

            </Form>
        </div>
    );
};

export default LoginForm;