import React from "react";
import grey from "../assets/Grey.jpg";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { delValuesOfCard } from "../store/Slice";
import { useDispatch } from "react-redux";

const CardStructure = ({ cardData }) => {
  
  const dispatch = useDispatch();
  const id = cardData.card.groupId

  const deleteCard = () => {
    dispatch(delValuesOfCard(cardData.card.groupId));
  };


  return (
    <div
      key={cardData.id}
      className="flex flex-col p-4 ring-2 ring-red-600 h-[190px] w-[250px] bg-yellow-300 shadow-lg rounded-md space-y-4"
    >
      <div className="flex gap-5">
        <img
          src={cardData.card.image}
          alt={grey}
          className=" h-[55px] w-[55px] rounded-[100px]"
        />
        <div className="flex flex-col py-2">
          <div className="text-[15px] font-bold">{cardData.card.groupName}</div>

          <div className="flex  gap-2 text-slate-700 font-semibold text-[13px]">
            {cardData.card.array.length}{" "}
            {cardData.card.array.length > 1 ? <p>cards</p> : <p>card</p>}
          </div>
        </div>
      </div>

      <div className="text-xs truncate">{cardData.card.groupDescription}</div>

      <div className="flex justify-between">
        <Link
        to={`/flashcardinfo/${cardData.card.groupId}`}
          className="text-sm font-semibold text-red-600 rounded-[5px] hover:scale-110 duration-300 active:text-blue-400
              "
        >
          View Card
          <ArrowRightAltIcon />
        </Link>

        <button
          className="duration-300 text-slate-500 hover:scale-125 active:text-red-600 "
          onClick={deleteCard}
        >
          <DeleteSweepIcon />
        </button>
      </div>
    </div>
  );
};

export default CardStructure;
