import { IoIosStar } from "react-icons/io";

interface RatingProps {
  rating: number;
}

export default function Rating(props: RatingProps) {
  const difference = 5 - props.rating;
  return (
    // Cái này check rating của review bao nhiêu sao, lưu ý là irl thì k đc chọn 0/5 sao nên lúc sao khi implement m nhớ thêm Validation trong zod là rating thì k được để review 0/5
    <div>
      {props.rating != 0 ? (
        <div className="flex flex-row">
          {[...Array(props.rating)].map((star, index) => {
            return <IoIosStar className="text-yellow-400" key={index} />;
          })}
          {[...Array(difference)].map((star, index) => {
            return <IoIosStar className="text-gray-300" key={index} />;
          })}
        </div>
      ) : (
        <div className="flex flex-row">
          {[...Array(difference)].map((star, index) => {
            return <IoIosStar className="text-gray-300" key={index} />;
          })}
        </div>
      )}
    </div>
  );
}
