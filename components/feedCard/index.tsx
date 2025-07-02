import { Tweet } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaHeart, FaRetweet } from "react-icons/fa";

interface FeedCardProps {
     data: Tweet
}
const FeedCard: React.FC<FeedCardProps> = (props) => {

  const  {data} = props;
  // console.log("datadata>>-----", data)
  return (
    <div
      className="border border-r-0 border-l-0 p-5 border-gray-600 hover:bg-slate-900
    transition-all cursor-pointer "
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1 w-full"> 
          {data?.author?.profileImageURL &&<Image
            className="rounded-full"
            src={data?.author?.profileImageURL}
            alt="user Image"
            width={200}
            height={100}
          />}
        </div>
        <div className="col-span-11 text-white w-full">
          <h5> 
            <Link href={`/${data?.author?.id}`}>
            {data?.author?.firstName +' '+ data?.author?.lastName}
            </Link>
            </h5>

          <p>{data?.content}</p>
           {data && data?.imageURL && <Image src={data?.imageURL} height={200} width={200} alt={'Image'}/>}
          <ul className="flex justify-between mt-5 text-xl items-center
          p-2 w-[90%]">
            <li>
                <BiMessageRounded/>
            </li>
            <li>
                <FaRetweet/>
            </li>
            <li>
                <FaHeart/>
            </li>
            <li>
                <BiUpload/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
