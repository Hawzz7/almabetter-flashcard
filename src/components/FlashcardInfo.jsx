//This page will show all the details of the card that has been made during the form fillup in createFlashcard page

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import HandsTab from "../assets/hands-tab.jpg";
import WestIcon from "@mui/icons-material/West";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import Modal from "../components/Modal";

const FlashcardInfo = () => {
  //The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>
  const { groupId } = useParams();

  //This will take us back to the cards page
  const navigate = useNavigate();
  const pdfRef = useRef();

  //getting all the form data from the store
  const cardData = useSelector((state) => {
    return state.cards.valuesOfCard;
  });

  const [curentCard, setCurentCard] = useState({});
  const [cardTerm, setCardTerm] = useState({});

  const viewCard = (id) => {
    const showCardTerm = curentCard.array.filter((item) => item.termId === id);
    setCardTerm(showCardTerm[0]);
  };

  //This will filter the card data individually and show the details with the help of groupId
  useEffect(() => {
    if (!groupId || !cardData) return;
    const temp = cardData.filter((item) => item.card.groupId === groupId);
    setCurentCard(temp[0].card);
  }, [groupId, cardData]);

  useEffect(() => {
    curentCard.array && setCardTerm(curentCard.array[0]);
  }, [curentCard]);

  
  const [showModal, setShowModal] = useState(false);

  const [url, setUrl] = useState("");

  //This will share the url of the curent page
  const shareurl = () => {
    setShowModal(true);
    setUrl(`${document.location.href}`);
  };

  //This function will download data of the curent page
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("flashcardinfo.pdf");
    });
  };
  const componentRef = useRef();

  //This will print the data of the curent page
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      className="flex items-center justify-center w-full min-h-full"
      ref={node => {
        pdfRef.current = node;
        componentRef.current = node;
      }}
    >
      <div className="flex flex-col w-full px-4 space-y-4 h-fit sm:w-[635px] md:w-[740px] lg:w-[900px]">
        <div className="flex flex-col gap-4 sm:flex-row">

        {/* This will navigate us to flashcards page */}
          <div
            className="duration-200 hover:scale-110 active:text-red-600"
            onClick={() => navigate(-1)}
          >
            {<WestIcon />}
          </div>

          <div className="flex items-center justify-center">
            {/* will show the group image */}
            <img
              src={curentCard.image}
              alt={HandsTab}
              className=" h-[100px] w-[100px] rounded-[100px] ring-2 ring-black"
            />
          </div>
          {/* will show the group name and group description */}
          <div className="flex flex-col items-center justify-center sm:justify-start sm:items-start">
            <h1 className="text-3xl font-bold">
            {curentCard.groupName}</h1>
            <p>{curentCard.groupDescription}</p>
          </div>
        </div>

        <div className="items-center justify-center w-full h-full gap-2 space-y-2 sm:flex">
          <div className="flex flex-col items-center justify-center h-fit w-full sm:w-[200px] lg:w-[220px] gap-2 p-4 sm:mt-2 bg-yellow-300 border-none rounded-md ">
            <h2 className="text-[17px] font-semibold">Flashcards</h2>
            <hr className="w-full border-t-2 border-black sm:w-[170px] " />
            <div className="mt-1 mb-1 space-y-1">
              {/* Will display all the term names */}
              {curentCard.array &&
                curentCard.array.map((item, index) => (
                  <div
                    key={item.termId}
                    className={`flex justify-center items-center mt text-slate-600 font-medium rounded-md hover:scale-105 duration-300 cursor-pointer ${
                      item.termId === cardTerm.termId &&
                      "!text-red-600 !font-bold"
                    }`}
                    onClick={() => viewCard(item.termId)}
                  >
                    {index + 1}.&nbsp;{item.termName}
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-fit w-full sm:w-[200px] md:w-[300px] md:flex-row lg:w-[400px] gap-2 p-4 bg-yellow-300 border-none rounded-md">
             {/* Will display term image */}
            <img
              className="sm:h-[150px] sm:w-[140px] "
              src={cardTerm.termImage}
              alt={HandsTab}
            />
             {/* Will display the term defination */}
            <p>{cardTerm.termDefination}</p>
          </div>

          <div className="flex flex-col space-y-2">
            {/* Button to open the share Modal component*/}
            <button
              className="flex items-center justify-center h-fit w-full sm:w-[200px] lg:w-[220px] gap-2 p-2 bg-yellow-300 border-none hover:scale-105 duration-300 rounded-md"
              onClick={() => shareurl()}
            >
              <ShareIcon /> Share
            </button>

            {/* Button for dowloading the curent page as pdf */}
            <button
              className="flex items-center justify-center h-fit w-full sm:w-[200px] lg:w-[220px] gap-2 p-2 bg-yellow-300 border-none hover:scale-105 duration-300 rounded-md"
              onClick={downloadPDF}
            >
              <DownloadIcon /> Download
            </button>
            
            {/* Button for printing the curent page */}
            <button className="flex items-center justify-center h-fit w-full sm:w-[200px] lg:w-[220px] gap-2 p-2 bg-yellow-300 border-none hover:scale-105 duration-300 rounded-md"
            onClick={handlePrint}
            >
              <PrintIcon /> Print
            </button>
          </div>
        </div>

        {/* The Modal component */}
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          share={url}
        />
      </div>
    </div>
  );
};

export default FlashcardInfo;
