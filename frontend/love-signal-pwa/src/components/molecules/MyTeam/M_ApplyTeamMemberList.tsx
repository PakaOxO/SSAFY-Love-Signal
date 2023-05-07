import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/M_ApplyTeamMember.module.scss";
import { member } from "../../../types/member";
import A_ApplyTeamMember from "../../atoms/MyTeam/A_ApplyTeamMember";

type PropsType = {
  team: member[];
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
};

const M_ApplyTeamMemberList: React.FC<PropsType> = ({
  team,
  setOppoVisible,
}) => {
  const openModal = () => {
    setOppoVisible(true);
  };
  return (
    <ul className={style.team} onClick={openModal}>
      {team.map((member, idx) => (
        <A_ApplyTeamMember key={idx} />
      ))}
    </ul>
  );
};

export default M_ApplyTeamMemberList;