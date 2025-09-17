import Menu from "@/components/menu/Menu";
import React from "react";
import { Profile } from "@/components/profile/Profile";
import { getData } from "@/services/api/getData";

type Props = {
    params: { username: string }
}

const Page = async ({ params }: Props) => {

    const { username } = await params;

    const user = await getData.getUserByUsername(username)

    return (
        <div>
            <header className="pt-[34px]  flex items-center justify-center ">
                <div className="w-[84%] max-w-[1249px]">
                    <Menu />
                </div>
            </header>

            <main className="mt-10 flex justify-center">
               <Profile user={user}/>
            </main>
        </div>
    );
};

export default Page;