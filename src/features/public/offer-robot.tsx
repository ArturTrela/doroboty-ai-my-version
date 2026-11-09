import desktop from "./assets/humanoid-z-ogloszeniem.png";
import mobile from "./assets/humanoid-mobilny.png";

export function OfferRobot() {
  return (
    <>
      <div className="robot-presenter robot-presenter-desktop" aria-hidden="true">
        <img className="robot-presenter-body" src={desktop} alt="" />
        <img className="robot-presenter-arm" src={desktop} alt="" />
      </div>
      <div className="robot-presenter robot-presenter-mobile" aria-hidden="true">
        <img src={mobile} alt="" />
        <svg className="robot-blink" viewBox="0 0 1536 1024">
          <path
            fill="#eedfc8"
            d="M493 378Q490 342 517 320Q551 298 581 316Q605 327 597 357Q587 393 571 410Q553 429 514 414Q488 403 493 378ZM643 425Q647 388 674 360Q704 337 729 347Q749 354 737 383Q728 421 702 443Q687 455 658 448Q639 444 643 425Z"
          />
          <path
            fill="none"
            stroke="#201c19"
            strokeWidth="6"
            strokeLinecap="round"
            d="M502 367Q538 396 587 367M652 405Q684 432 724 399"
          />
        </svg>
        <img className="robot-presenter-grip" src={mobile} alt="" />
      </div>
    </>
  );
}
