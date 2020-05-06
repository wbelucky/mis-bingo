import React from "react";
import { CellStat } from "../../pages/bingo";
import Link from "next/link";

type ContainerProps = CellStat;
type Props = ContainerProps;

const Component: React.FC<Props> = ({ filled, imageURL, name, id }) => {
  return (
    <>
      {/* <Link href={`/users/${id}`}> */}
      <p>{name}</p>
      <Link href={`users/${id}`}>
        <a>
          <img src={imageURL} />
        </a>
      </Link>
      {/* </Link> */}
      <style jsx>{`
      p {
        font-size: auto;
      }
      img {
        width: auto;
        height: auto;
        max-width: 40px;
        max-height; 40px;
        filter: brightness(${!filled ? "50%" : "100%"});
      }
    `}</style>
    </>
  );
};

export default Component;
