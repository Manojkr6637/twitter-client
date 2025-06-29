 
import { 
  BiImageAlt, 
} from "react-icons/bi"; 
import FeedCard from "@/components/feedCard";
 
import { useCallback, useEffect } from "react";
import { useState } from "react"; 

import { useCurrentUser } from "@/hooks/user";
import { useGetAllTweets } from "@/hooks/tweet"; 

import { useCreateTweet } from "@/hooks/tweet";
import Image from "next/image";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from '@/components/Layout/TwitterLayout'
import { graphqlClient } from "@/clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import toast from "react-hot-toast";
import axios from "axios";
import { Ultra } from "next/font/google";

interface HomeProps{
  tweets?: Tweet[]
}
 
export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const {tweets=props.tweets as Tweet[]} = useGetAllTweets();
  const {mutateAsync } = useCreateTweet();

  const [content, setContent] = useState<string>('');
  const [imageURL, setImageURL] = useState("")

 
  const handleCreateTweet = useCallback(async()=>{
    await mutateAsync({content, imageURL });

    setContent("")
    setImageURL("")
 
   },[content, imageURL,mutateAsync])

    

   const handleInputChangeFile = useCallback((input: HTMLInputElement) =>{
        return async (event: Event) => {
             event.preventDefault();
             console.log(input.files)
             const file: File | null | undefined = input.files?.item(0);

             if(!file) return;

             const  {getSignedURLForTweet} =await graphqlClient.request(getSignedURLForTweetQuery, {
              imageName: file.name,
              imageType: file.type
             } )
             if(getSignedURLForTweet){
              toast.loading('Uploading...', {id: '2'})

              await axios.put(getSignedURLForTweet, file, {
                headers: {
                  'Content-Type': file.type
                }
              })
              toast.success('upload completed', {id: '2'})

              const url = new URL(getSignedURLForTweet)
              const myFilePath = `${url.origin}${url.pathname}`
              setImageURL(myFilePath);
             }


        }
   }, []);

  const handleSelectImage = useCallback(()=>{
       const input  = document.createElement("input");
       input.setAttribute('type','file')
       input.setAttribute('accept','image/*')

       const  handleFn = handleInputChangeFile(input)

       input.addEventListener("change", handleFn)

       input.click();

  },[handleInputChangeFile])
 

  return (
    <TwitterLayout>
      <div
        className="border border-r-0 border-l-0 p-5 border-gray-600 hover:bg-slate-900
                 transition-all cursor-pointer "
      >
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-1 w-full">
            {user && user?.profileImageURL && (
              <Image
                className="rounded-full"
                src={user?.profileImageURL}
                alt="user Image"
                width={200}
                height={100}
              />
            )}
          </div>
          <div className="col-span-11 w-full">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full bg-transparent text-xl px-3 border-b border-slate-700 text-white"
              rows={3}
              placeholder="What's happening?"
            ></textarea>
            {imageURL && <Image src={imageURL} alt="Image" width={200} height={200} /> }
            <div className="mt-2 flex justify-between items-center">
              <BiImageAlt
                onClick={handleSelectImage}
                className="text-xl text-white"
              />
              <button
                onClick={handleCreateTweet}
                className="py-1 px-4 text-white font-semibold text-sm
                   bg-sky-500  rounded-full "
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
      {tweets?.map((item) => (
        <FeedCard key={item?.id} data={item as Tweet} />
      ))}
    </TwitterLayout>
  );
}
