import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState, useRef } from "react";
import Rating from "./Rating";
import Comment from "./Comment";

interface ReviewProps {
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
        <div className="flex flex-row">
          <Avatar className="place-self-center h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="place-self-center ml-2">{props.name}</span>
        </div>
        <div>
          <Rating rating={props.rating} />
          <span className="font-semibold">{props.title}</span>
          <br />
          <span className="opacity-75">
            Reviewed on{"  "}
            {Intl.DateTimeFormat("en-GB", { dateStyle: "short" }).format(
              props.date
            )}
          </span>
        </div>
      </div>
      <Comment comment={props.comment} />
    </div>
  );
}
