import A_ChatFaceImage from "../../atoms/Chat/A_ChatFaceImage";
import A_ChatPeopleImage from "../../atoms/Chat/A_ChatPeopleImage";
import style from "./styles/M_ChatItemImage.module.scss";
import { member } from "../../../types/member";
type PropsType = {
  type: string;
  members?: member[];
};

const M_ChatItemImage: React.FC<PropsType> = ({ type, members }) => {
  const imgs =
    members != undefined ? members.map((item: member) => item.imgSrc) : [];

  const isRoom = !(type === "ANONYMOUS" || type === "NOTICE");
  return (
    <div className={`${style.imageBox} ${isRoom && style.room}`}>
      {!isRoom ? (
        <A_ChatFaceImage type={type} />
      ) : (
        <A_ChatPeopleImage imgs={imgs} />
      )}
    </div>
  );
};

export default M_ChatItemImage;
