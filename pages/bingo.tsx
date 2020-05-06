import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Table } from "semantic-ui-react";
import BingoCell from "../src/components/BingoCell";
import { NextPage } from "next";

type Props = { cellStats: Record<number, CellStat> };

export interface CellStat {
  id: number;
  name: string;
  filled: boolean;
  usedInBingoLine: boolean;
  imageURL: string;
}

const Component: React.FC<Props> = ({ cellStats }) => (
  <div style={{ height: "1080px" }}>
    <Table unstackable>
      <Table.Body>
        {new Array(5).fill(0).map((_, i) => (
          <Table.Row key={i}>
            {new Array(5).fill(0).map((_, j) => (
              <Table.Cell key={j}>
                <BingoCell {...cellStats[i * 5 + j]} />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

const Page: NextPage = (props) => {
  console.log(props);
  const [cellStats, setCellStats] = useState<Record<number, CellStat>>(() =>
    new Array(25).fill(0).map(
      (_, i): CellStat => ({
        id: i,
        name: `${i}さん`,
        imageURL: "https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png",
        filled: false,
        usedInBingoLine: false,
      })
    )
  );
  return <Component cellStats={cellStats} />;
};

export default Page;
