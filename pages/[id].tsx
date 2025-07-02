import type { GetServerSideProps, NextPage } from "next";

import TwitterLayout from "@/components/Layout/TwitterLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import FeedCard from "@/components/feedCard";
import { Tweet, User } from "@/gql/graphql";
// import { useRouter } from "next/router";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCallback, useMemo } from "react";
import { followUserMutation, unFollowUserMutation } from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";
import { RequestDocument } from "graphql-request";


interface ServerProps {

   userInfo?: User
   
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
   // const router  = useRouter()
   const {user: currentUser} = useCurrentUser()

   const queryClient = useQueryClient();
     
   const amIFollowing = useMemo(()=>{
       if(!props?.userInfo) return false;

       return (
           (props?.userInfo?.followers?.findIndex((el)=>el?.id === currentUser?.id)?? -1)>0
       );

   },[currentUser?.id, props?.userInfo?.id]);

   console.log("amIFollowingamIFollowing",amIFollowing,currentUser?.id,props?.userInfo?.followers)


   const handleFollowUser = useCallback(async ()=>{
      // console.log('handleFollowUser',props?.userInfo?.id)
       if (!props?.userInfo?.id) return;

        await graphqlClient.request(followUserMutation, {to: props?.userInfo?.id})

          await queryClient.invalidateQueries({ queryKey: ["current-user"] });


   },[props?.userInfo?.id])


    const handleUnFollowUser = useCallback(async ()=>{ 
       if (!props?.userInfo?.id) return; 
      const dd=   await graphqlClient.request(unFollowUserMutation, {to: props?.userInfo?.id})
//  console.log('handleUnFollowUser--dd',dd)
        await queryClient.invalidateQueries({ queryKey: ["current-user"] });


   },[props?.userInfo?.id])

   
//   console.log("propsprops",props)
  return (
    <TwitterLayout>
      <div>
         <nav className="border flex items-center gap-3 py-3 px-3">
             <BsArrowLeftShort className="text-4xl text-white"/>
             <div>
                <h1 className="text-2xl font-bold text-white"> {props.userInfo?.firstName}</h1>
                <h1 className="text-md font-bold  text-slate-400"> {props.userInfo?.tweets?.length} tweets</h1>
             </div>
         </nav>
         <div className="p-4 border-b border-slate-800 text-white">
              {currentUser?.profileImageURL &&
               <Image src={currentUser?.profileImageURL} 
               alt="user Image"
               width={100}
               height={100}
               className="rounded-full "
               />
              }
              <h1 className="text-2xl font-bold">{props.userInfo?.firstName}</h1>
              <div className="flex justify-between items-center">
                  <div className="flex gap-2 text-gray-500">               
                        <span>{props?.userInfo?.followers?.length} Following &nbsp;&nbsp;&nbsp;</span>
                        <span>{props?.userInfo?.following?.length} Follower</span>
                     </div>

                     {currentUser?.id ==props?.userInfo?.id && (
                        <>
                     {amIFollowing?  <button className="bg-white text-black flex rounded-full py-2 px-2 text-sm"
                        onClick={handleFollowUser}
                     >
                     Follow
                  </button>:<button className="bg-white text-black flex rounded-full py-2 px-2 text-sm"
                   onClick={handleUnFollowUser}
                  >
                     UnFollow
                  </button>}
                  </>
                  )}
              </div>
         </div>
         <div>
            {currentUser?.tweets?.map((tweet)=>
            <FeedCard data={tweet as Tweet} key={tweet?.id} />)
            }
         </div>
         
      </div>
     
    </TwitterLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (context)=>{

   const id = context.query.id as string | undefined;
   if(!id) return {notFound: true, props:{user:undefined}};

   // const userInfo = await graphqlClient.request(getUserByIdQuery, {id:id});
     const userInfo = await graphqlClient.request(getUserByIdQuery,{id:id})
    console.log("userInfouserInfouserInfo.",userInfo)
   if(!userInfo?.getUserById) return {notFound: true};

   return {
      props: {
         userInfo:  userInfo?.getUserById as User
      }
   }
}

export default UserProfilePage;
