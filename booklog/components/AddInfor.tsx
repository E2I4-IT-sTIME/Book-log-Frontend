import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import basicprofile from "./Img/basicprofile.png";
import axios from "axios";

interface infor {
  email: string;
  password: string;
}

export default function AddInfor(props: infor) {
  //추가정보 입력 컴포넌트
  const { email, password } = props;
  const [profile, setProfile] = useState("");
  const [attachment, setAttachment] = useState(basicprofile);
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [job, setJob] = useState("학생");
  const [country, setCountry] = useState([]);

  const onImageHandler = (e: any) => {
    const {
      target: { files, value },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    setProfile(value);
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onChangeHandler = (e: any) => {
    switch (e.target.id) {
      case "name":
        setUserName(e.target.value);
        break;
      case "nick":
        setNickName(e.target.value);
        break;
      case "birth":
        setBirth(e.target.value);
        break;
    }
  };

  const onRadioHandler = (content: string) => {
    setJob(content);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
  };

  const okButtonHandler = async (e: any) => {
    // console.log(`사진 : ${attachment}`);
    try {
      await axios.post(
        "http://172.30.1.42/join",
        {
          email: email,
          password: password,
          username: userName,
          nickname: nickName,
          birthday: birth,
          job: job,
          area: country,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>추가정보 입력</h1>
      <span>*은 필수 입력 정보입니다.</span>
      <form onSubmit={onSubmitHandler}>
        <div>
          <h3>프로필사진</h3>
          <Image
            src={attachment}
            alt="프로필이미지"
            width="100px"
            height="100px"
          />
          <input
            name="file"
            type="file"
            accept="image/*"
            onChange={onImageHandler}
            value={profile}
          />
        </div>
        <div>
          <h3>이름*</h3>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력해주세요."
            required
            value={userName}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div>
          <h3>닉네임*</h3>
          <input
            id="nick"
            type="text"
            placeholder="닉네임을 입력해주세요."
            required
            value={nickName}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div>
          <h3>생년월일*</h3>
          <input
            id="birth"
            type="date"
            required
            value={birth}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div>
          <h3>직업</h3>
          <input
            type="radio"
            readOnly
            id="학생"
            checked={job === "학생"}
            onClick={() => onRadioHandler("학생")}
          />
          <label htmlFor="학생">학생</label>
          <input
            type="radio"
            readOnly
            id="프리랜서"
            checked={job === "프리랜서"}
            onClick={() => onRadioHandler("프리랜서")}
          />
          <label htmlFor="프리랜서">프리랜서</label>
          <input
            type="radio"
            readOnly
            id="직장인"
            checked={job === "직장인"}
            onClick={() => onRadioHandler("직장인")}
          />
          <label htmlFor="직장인">직장인</label>
          <input
            type="radio"
            readOnly
            id="전문도서인"
            checked={job === "전문도서인"}
            onClick={() => onRadioHandler("전문도서인")}
          />
          <label htmlFor="전문도서인">전문도서인</label>
          <input
            type="radio"
            readOnly
            id="블로거"
            checked={job === "블로거"}
            onClick={() => onRadioHandler("블로거")}
          />
          <label htmlFor="블로거">블로거</label>
        </div>
        <div>
          <h3>관심 지역(최소 3개)</h3>
        </div>
      </form>

      <button onClick={okButtonHandler}>완료</button>
      <button>취소</button>
    </div>
  );
}
