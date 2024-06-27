import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState, useRef } from "react";
import Rating from "./Rating";
import Comment from "./Comment";
import { Separator } from "@radix-ui/react-separator";
import { Delete, Trash, TrashIcon } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";

interface ReviewProps {
  reviewId: string;
  userId: string;
  currentUserId: string;
  name: string;
  title: string;
  comment: string;
  rating: number;
  date: Date;
}

export default function Review(props: ReviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.scrollHeight, ref.current.clientHeight);
      setShowBtn(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="grid auto-rows-max grid-flow-row">
        <div className="flex flex-row mb-2">
          <Avatar className="place-self-center h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="place-self-center ml-2">{props.name}</span>
          {props.userId === props.currentUserId && (
            <button
              onClick={() => {
                axios
                  .delete(`/api/reviews/${props.reviewId}`, {
                    data: { userId: props.userId },
                  })
                  .then((res) => {
                    console.log(res.data);
                  });
              }}
              className="place-self-center ml-auto"
            >
              <IoTrashOutline className="hover:text-red-500 font-light place-self-center ml-auto cursor-pointer" />
            </button>
          )}
        </div>
        <div>
          <Rating rating={props.rating} />
          <span className="font-semibold">{props.title}</span>
          <br />
          <span className="opacity-75">
            Reviewed on{"  "}
            {new Date(props.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <Comment comment={props.comment} />
    </div>
  );
}
