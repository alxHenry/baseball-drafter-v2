import { Body, Table } from "@table-library/react-table-library";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/chakra-ui/index";
import { useTheme } from "@table-library/react-table-library/theme";
import { FC, memo } from "react";
import TeamDisplayTableHeader from "./TeamDisplayTableHeader";
import TeamDisplayTableRow from "./TeamDisplayTableRow";
import { useTeamDisplayTableData } from "./useTeamDisplayTableData";

interface Props {}

const TeamDisplayTable: FC<Props> = () => {
  const data = useTeamDisplayTableData();

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const tableTheme = useTheme(chakraTheme);

  return (
    <Table data={data} theme={tableTheme}>
      {(tableList) => (
        <>
          <TeamDisplayTableHeader />
          <Body>
            {(tableList as TeamRotoRankings[]).map((item) => (
              <TeamDisplayTableRow key={item.id} />
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default memo(TeamDisplayTable);
