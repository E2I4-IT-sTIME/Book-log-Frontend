import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import basicprofile from "./Img/basicprofile.png";
import axios from "axios";
import Router from "next/router";

interface infor {
  email: string;
  password: string;
}

export default function AddInfor(props: infor) {
  //추가정보 입력 컴포넌트
  const { email, password } = props;
  const [profile, setProfile] = useState("");
  const [attachment, setAttachment] = useState(basicprofile);
  const [imgFile, setImgFile] = useState<File>();
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [job, setJob] = useState("학생");
  const [country, setCountry] = useState("임시");
  const router = Router;

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
      setImgFile(theFile);
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

  const multipartFile = new FormData();
  const okButtonHandler = () => {
    if (imgFile) {
      multipartFile.append("image", imgFile);
      multipartFile.append("username", userName);
      multipartFile.append("password", password);
      multipartFile.append("email", email);
      multipartFile.append("birthday", "2010-10-10");
      multipartFile.append("job", job);
      join;
    } else {
      alert("아직 모든 정보를 입력하지 않으셨습니다.");
    }
  };

  const join = async () => {
    axios
      .post("http://15.164.193.190:8080/join", multipartFile, {
        withCredentials: true,
      })
      .then((res) => {
        if (
          res.data ===
          "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
        )
          alert(
            "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
          );
        else res.data === "회원가입완료";
        router.push("/");
      })
      .catch((res) => {
        console.log("Error!");
      });
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
