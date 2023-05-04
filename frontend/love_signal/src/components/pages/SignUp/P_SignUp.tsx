import style from "./styles/SignUp.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import A_SignUp_Desc1 from "./A_SignUp_Desc1";
import Introduce from "../Mypage/Introduce";
import A_SignUp_Desc2 from "./A_SignUp_Desc2";
import A_SignUp_Desc3 from "./A_SignUp_Desc3";
import A_SignUp_Desc4 from "./A_SignUp_Desc4";
import M_SignUp_Profile from "./M_SignUp_Profile";
import M_SignUp_Birth from "./M_SignUp_Birth";
import M_SignUp_Nickname from "./M_SignUp_Nickname";
import A_MainLogo from "./A_MainLogo";
import M_SignUp_Introduce from "./M_SignUp_Introduce";

const P_SignUp = () => {
  const [email] = useState<string>("");
  const [password] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [checkNickname, setCheckNickname] = useState<boolean>(false);
  const [checkProfileOk, setCheckProfileOk] = useState<boolean>(false);
  const [checkNickOk, setCheckNickOk] = useState<boolean>(false);
  const [checkBirthOk, setCheckBirthOk] = useState<boolean>(false);

  const navigate = useNavigate();

  const birth: string = "1997";
  const description: string = "나는 손종효다";
  const gender: string = "M";
  const help: string = "T";

  // const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   setEmail(target.value);
  // };

  // const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   setPassword(target.value);
  // };

  const handleProfile = () => {
    setCheckProfileOk(!checkProfileOk);
  };

  const handleNickname = () => {
    setCheckNickOk(!checkNickOk);
  };

  const handleBirth = () => {
    setCheckBirthOk(!checkBirthOk);
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setNickname(target.value);
    setCheckNickname(false); //바뀌면 바로 false로 바꿔줘.
  };

  //중복확인 해주는 함수입니다.
  const duplecheck = () => {
    console.log("!");
    axios
      .get(`http://localhost:8888/member/auth/check/nickname/${nickname}`)
      .then((response) => {
        //여기로 와서 만약 response가 중복되지 않은것을 알려주었다면?

        if (response) {
          setCheckNickname(true); //중복확인 체크하기.
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);

        console.log(err); //에러발생!
      });
  };

  //회원가입 버튼 클릭했을때
  const signup = () => {
    if (checkNickname) {
      //중복 확인 했을때만 가능하다
      axios
        .post("http://localhost:8888/member/auth/sign-up", {
          birth: birth,
          description: description,
          gender: gender,
          help: help,
          loginId: email,
          nickname: nickname,
          password: password,
        })
        .then((response) => {
          console.log(response);
          navigate("/Manual");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //아니면 중복확인 눌러줘~
      alert("중복확인 체크는 하셨나요?");
    }
  };

  return (
    <div className={style.box}>
      <div className={`${style.Container} diagonal-gradient`}>
        <div className={style.center}>
          <A_MainLogo />
          {!checkProfileOk && !checkNickOk && !checkBirthOk && (
            <M_SignUp_Profile onClick={handleProfile} />
          )}
          {checkProfileOk && !checkNickOk && !checkBirthOk && (
            <M_SignUp_Nickname
              nickname={nickname}
              onClick1={duplecheck}
              onClick2={handleNickname}
              onChange={handleChangeNickname}
            />
          )}
          {checkProfileOk && checkNickOk && !checkBirthOk && (
            <M_SignUp_Birth
              birth={birth}
              onClick={handleBirth}
              onChange={handleChangeNickname}
            />
          )}
          {checkProfileOk && checkNickOk && checkBirthOk && (
            <M_SignUp_Introduce
              description={description}
              onClick={signup}
              onChange={handleChangeNickname}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default P_SignUp;