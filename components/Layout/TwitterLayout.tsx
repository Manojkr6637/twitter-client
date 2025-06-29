import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import React, { useCallback, useMemo, useState } from "react";
import { BsTwitter } from "react-icons/bs";

import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/feedCard";
import {
  BiBookmark,
  BiEnvelope,
  BiHash,
  BiHomeCircle,
  BiImageAlt,
  BiLogIn,
  BiMoney,
  BiUser,
} from "react-icons/bi";

import { toast } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useGetAllTweets } from "@/hooks/tweet";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet } from "@/hooks/tweet";
import Image from "next/image";
import Link from "next/link";
 

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}


interface TwitterLayoutProps {
  children: React.ReactNode;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser(); 
  const { mutate } = useCreateTweet();
 const sidebarMenuItems: TwitterSidebarButton[] = useMemo(()=>
  [
    
    {
      title: "Home",
      icon: <BiHomeCircle />,
      link: '/'
    },
    {
      title: "Explore",
      icon: <BiHash />,
      link: '/'
    },
    {
      title: "Notifications",
      icon: <BiEnvelope />,
      link: '/'
    },
    {
      title: "Messages",
      icon: <BiBookmark />,
      link: '/'
    },
    {
      title: "Twitter Blue",
      icon: <BiMoney />,
      link: '/'
    },
    {
      title: "Users",
      icon: <BiUser />,
      link: `/${user?.id}`
    },
    {
      title: "More Options",
      icon: <SlOptions />,
      link: '/'
    },
  
 ],[user?.id]);
 

  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred?.credential;
      if (!googleToken) {
        return toast.error("Google login failed");
      }
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success(`Verified Google Token: ${verifyGoogleToken}`);
      console.log(verifyGoogleToken);
      if (verifyGoogleToken)
        localStorage.setItem("_twitter_token", verifyGoogleToken);
      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.click();
  }, []);

  return (
    <div className="bg-black">
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pr-4 flex pt-1  relative sm:justify-end">
         <div>
         <div className="text-3xl h-fit w-fit text-white hover:bg-gray-600 rounded-full p-2 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-2 text-2xl font-semibold pr-4">
            <ul>
              {sidebarMenuItems?.map((item) => (
                <li
                 
                  key={item.title}
                >
                  <Link href={item.link}  className="flex justify-start items-center
              gap-4 hover:bg-gray-800 rounded-lg px-3 py-3 w-fit
               text-white">
                  <span className="text-2xl ">{item.icon}</span>
                  <span className="text-sm hidden sm:block">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-2">
              <button
                className="p-4 hidden sm:block text-white font-semibold 
             text-lg bg-sky-500 w-full rounded-full mt-5 "
              >
                {" "}
                Tweet
              </button>
              <button
                className="p-4 block sm:hidden text-white font-semibold 
             text-lg bg-sky-500 w-full rounded-full mt-5 "
              >
                   <BsTwitter />
              </button>
            </div>
            {user && (
              <div
                className="absolute bottom-4 flex gap-2 items-center
          px-2 py-1 rounded-xl bg-slate-800 mr-4"
              >
                {user && user?.profileImageURL && (
                  <Image
                    src={user?.profileImageURL}
                    className="rounded-full "
                    alt="user  Profile"
                    width={50}
                    height={50}
                  />
                )}

                <div className="hidden sm:block">
                  <p className="text-sm text-white">
                    {user?.firstName + ' '+user?.firstName}
                  </p>
                </div>
              </div>
            )}
          </div>
         </div>
        </div>
         <div className="col-span-8 sm:col-span-7 border-r-[1px]  border-l-[1px] border-gray-600 h-screen overflow-scroll">
            {props.children}
         </div>
        <div className=" col-span-3 sm:col-span-2 p-5">
          {!user && (
            <div className=" hidden sm:block p-5 bg-slate-700 rounded-lg text">
              <h1 className="text-white my-1 text-sm "> New to Twitter</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
            {!user && (
            <div className=" block sm:hidden p-5 bg-slate-700 rounded-lg text">
              <h1 className="text-white my-2 text-2xl"> <BiLogIn></BiLogIn> </h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;
