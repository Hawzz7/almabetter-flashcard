import { React, useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const Modal = ({ isVisible, onClose, share }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "closeit")  onClose();
  };

  const facebookUrl = "https://www.facebook.com/";
  const whatsAppUrl = "https://web.whatsapp.com/";
  const twitterUrl = "https://twitter.com/";
  const emailUrl = "https://gmail.com/";
  const linkdinUrl = "https://www.linkedin.com/";

  const [inputValue, setInputValue] = useState(`Link: ${share}`);

  const [linkCopied, setLinkCopied] = useState(false)

  const handleCopy = ()=>{
    setLinkCopied(true)
  }
  useEffect(()=>{
    setTimeout(()=> {
      if (linkCopied)
      setLinkCopied(false)
    }, 3000)
  }, [linkCopied])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full h-screen p-10 bg-black bg-opacity-25 backdrop-blur-sm"
      id="closeit"
      onClick={handleClose}
    >
      <div className="w-full h-full flex flex-col sm:w-[450px] sm:h-[250px] bg-white rounded-md p-4 space-y-2">
        <button className="place-self-end" type="button" onClick={onClose}>
          <CancelIcon />
        </button>
       <div className="px-6 space-y-4">
       <p className="text-lg font-semibold">Share :</p>
       <div className="p-0 text-red-600">
          {linkCopied && "Copied!"}
        </div>
        <div className="space-x-4 ">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            className="w-full ring-1 ring-blue-400 rounded-[4px] h-8 sm:w-[280px] px-2 "/>

          <button onClick={handleCopy}>
          <CopyToClipboard text={inputValue}>
            <ContentCopyIcon/>
          </CopyToClipboard>
          </button>

          <button>
            <ShareIcon/>
          </button>

        </div>
        
        <div className="w-full flex flex-wrap justify-center gap-[20px] pt-4">
          <FacebookShareButton url={facebookUrl}>
            <FacebookIcon className="rounded-full " size={20} />
          </FacebookShareButton>

          <WhatsappShareButton url={whatsAppUrl}>
            <WhatsappIcon className="rounded-full " size={20} />
          </WhatsappShareButton>

          <TwitterShareButton url={twitterUrl}>
            <TwitterIcon className="rounded-full " size={20} />
          </TwitterShareButton>

          <EmailShareButton url={emailUrl}>
            <EmailIcon className="rounded-full " size={20} />
          </EmailShareButton>

          <LinkedinShareButton url={linkdinUrl}>
            <LinkedinIcon className="rounded-full " size={20} />
          </LinkedinShareButton>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Modal;
