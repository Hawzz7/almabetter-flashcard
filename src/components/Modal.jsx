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
    if (e.target.id === "closeit") onClose();
  };

  const facebookUrl = "https://www.facebook.com/";
  const whatsAppUrl = "https://web.whatsapp.com/";
  const twitterUrl = "https://twitter.com/";
  const emailUrl = "https://gmail.com/";
  const linkdinUrl = "https://www.linkedin.com/";

  const [inputValue, setInputValue] = useState(`Link: ${share}`);

  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = () => {
    setLinkCopied(true);
  };
  useEffect(() => {
    setTimeout(() => {
      if (linkCopied) setLinkCopied(false);
    }, 3000);
  }, [linkCopied]);

  return (
    <div
      className="fixed inset-0 flex w-full h-full bg-black bg-opacity-25 backdrop-blur-sm px-10 py-10 items-center justify-center"
      id="closeit"
      onClick={handleClose}
    >
      <div className="flex flex-col w-full h-fit sm:w-[400px] sm:h-[240px] ring-2 ring-red-600 bg-yellow-400 rounded-md p-4">
        <div className="place-self-end">
          <button type="button" onClick={onClose}>
            <CancelIcon />
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-2 flex-col sm:flex-row sm:mt-10">
          <div>
            <p className="text-lg font-semibold">Share :</p>
          </div>
          <div>
            <input
              type="text"
              id="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full ring-1 ring-blue-400 rounded-[4px] h-8 sm:w-[260px] px-2 "
            />
            <div className="flex items-center justify-center text-red-600 fixed">
              {linkCopied && "Copied!"}
            </div>
          </div>
          <br />
          <div className="space-x-2">
            <button onClick={handleCopy}>
              <CopyToClipboard text={inputValue}>
                <ContentCopyIcon />
              </CopyToClipboard>
            </button>
          </div>
        </div>
        <br />

        <div className="w-full flex flex-wrap justify-center gap-4">
          <FacebookShareButton url={facebookUrl}>
            <FacebookIcon className="rounded-full " size={25} />
          </FacebookShareButton>

          <WhatsappShareButton url={whatsAppUrl}>
            <WhatsappIcon className="rounded-full " size={25} />
          </WhatsappShareButton>

          <TwitterShareButton url={twitterUrl}>
            <TwitterIcon className="rounded-full " size={25} />
          </TwitterShareButton>

          <EmailShareButton url={emailUrl}>
            <EmailIcon className="rounded-full " size={25} />
          </EmailShareButton>

          <LinkedinShareButton url={linkdinUrl}>
            <LinkedinIcon className="rounded-full " size={25} />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
