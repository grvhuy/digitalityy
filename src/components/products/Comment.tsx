import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

interface CommentProps {
  comment: string;
}

export default function Comment(props: CommentProps) {
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
    <div>
      <p ref={ref} className={`mt-2 ${isOpen ? null : "line-clamp-3"}`}>
        {props.comment}
      </p>
      {showBtn && (
        <>
          <Button variant="link_gold_black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <MdOutlineKeyboardArrowUp className="place-self-center" />
            ) : (
              <MdOutlineKeyboardArrowDown className="place-self-center" />
            )}
            {isOpen ? "Read less" : "Read more"}
          </Button>
        </>
      )}
    </div>
  );
}
