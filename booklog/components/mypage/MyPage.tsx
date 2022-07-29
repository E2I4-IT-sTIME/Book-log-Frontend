import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { recoilLoginedState } from "../../states/recoilLogiendState";
import Router from "next/router";

interface userInfo {
  birthday: string;
  email: string;
  id: number;
  image: string;
  job: string;
  username: string;
  logout: () => void;
}

interface editInfo {
  username: string;
  birthday: string;
  job: string;
}

export default function MyPage(props: userInfo) {
  const { birthday, email, id, image, job, username, logout } = props;
  const router = Router;

  const [nameEdit, setNameEdit] = useState(false);
  const [birthEdit, setBirthEdit] = useState(false);
  const [jobEdit, setJobEdit] = useState(false);

  const [nameContent, setNameContent] = useState(username);
  const [birthContent, setBirthContent] = useState(birthday);
  const [jobContent, setJobContent] = useState(job);

  const editHandler = (name: string, value: string) => {
    switch (name) {
      case "name":
        setNameContent(value);
        break;
      case "birth":
        setBirthContent(value);
        break;
      case "job":
        setJobContent(value);
        break;
      default:
        alert("잘못된 접근입니다.");
        break;
    }
  };

  const birthEnter = () => {
    if (birthTest()) {
      setBirthEdit(false);
    } else {
      alert("생년월일은, YYYY-MM-DD 형식으로 작성해야합니다.\nex)2000-10-01");
    }
  };

  const birthTest = (): boolean => {
    const pattern =
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return birthContent.match(pattern) !== null;
  };

  const saveHandler = () => {
    if (
      username === nameContent &&
      job === jobContent &&
      birthday === birthContent
    ) {
      alert("변경 사항이 없습니다.");
    } else if (nameEdit || jobEdit || birthEdit) {
      alert("프로필 수정을 완료하고 시도해주세요.");
    } else {
      save();
    }
  };

  const resignHandler = () => {
    if (
      confirm(
        "정말 회원 탈퇴를 진행하시겠습니까?\n삭제된 계정은 복구할 수 없습니다."
      )
    ) {
      resign();
    }
  };

  const save = () => {
    const multipartFile = new FormData();
    multipartFile.append("username", nameContent);
    multipartFile.append("birthday", birthContent);
    multipartFile.append("job", jobContent);
    axios
      .patch(`http://15.164.193.190:8080/auth/user/${id}`, multipartFile, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("프로필 수정에 성공하였습니다.");
        router.reload();
      })
      .catch((res) => {
        alert("프로필 수정에 실패하였습니다.");
        console.log(res);
      });
  };

  const resign = () => {
    axios
      .patch(
        `http://15.164.193.190:8080/auth/user/delete/${id}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        logout();
        alert("회원탈퇴가 완료되었습니다.\n언제든지 다시 찾아주세요!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="profile" />
      <button className="profile-edit">이미지 수정</button>
      <div className="info-box">
        <ul className="info-title">
          <li>이름</li>
          <li>생년월일</li>
          <li>직업</li>
        </ul>
        <ul className="info-detail">
          <li>
            {nameEdit ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={nameContent}
                  onChange={(e) => editHandler(e.target.name, e.target.value)}
                />
                <button onClick={() => setNameEdit(false)} className="save">
                  저장
                </button>
              </>
            ) : (
              <>
                <span>{nameContent}</span>
                <button onClick={() => setNameEdit(true)} className="edit">
                  수정
                </button>
              </>
            )}
          </li>
          <li>
            {birthEdit ? (
              <>
                <input
                  type="text"
                  name="birth"
                  value={birthContent}
                  onChange={(e) => editHandler(e.target.name, e.target.value)}
                />
                <button onClick={() => birthEnter()} className="save">
                  저장
                </button>
              </>
            ) : (
              <>
                <span>{birthContent}</span>
                <button onClick={() => setBirthEdit(true)} className="edit">
                  수정
                </button>
              </>
            )}
          </li>
          <li>
            {jobEdit ? (
              <>
                <input
                  type="text"
                  name="job"
                  value={jobContent}
                  onChange={(e) => editHandler(e.target.name, e.target.value)}
                />
                <button onClick={() => setJobEdit(false)} className="save">
                  저장
                </button>
              </>
            ) : (
              <>
                <span>{jobContent}</span>
                <button onClick={() => setJobEdit(true)} className="edit">
                  수정
                </button>
              </>
            )}
          </li>
        </ul>
      </div>
      <div className="btns">
        <button onClick={() => router.back()} className="profile-edit">
          이전화면으로
        </button>
        <button onClick={() => saveHandler()} className="profile-edit">
          수정사항저장
        </button>
      </div>
      <div className="down-box">
        <span onClick={() => resignHandler()}>회원탈퇴</span>
        <span>이용약관</span>
        <span>개인정보처리방침</span>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0px;
          gap: 30px;
        }
        .profile {
          width: 300px;
          height: 300px;
          border-radius: 100%;
          background-image: url(${image});
          background-size: cover;
          background-position: 50%;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
        }
        .profile-edit {
          background: none;
          border: solid 2px #324a86;
          border-radius: 10px;
          color: #324a86;
          font-weight: 700;
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .profile-edit:hover {
          background-color: #324a86;
          color: white;
        }
        .info-box {
          display: flex;
          flex-direction: row;
          gap: 30px;
          font-size: 18px;
          font-weight: 700;
        }
        .info-box li {
          padding-left: 0px;
          list-style-type: none;
        }
        .info-title {
          text-align: right;
          color: #324a86;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .info-detail {
          padding: 0px;
          width: 250px;
          display: flex;
          flex-direction: column;
          align-items: start;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .info-detail li {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .edit,
        .save {
          border: none;
          border-radius: 5px;
          color: white;
          font-weight: 600;
          font-size: 15px;
          padding: 2px 4px;
          cursor: pointer;
        }

        .edit {
          background-color: #f86258;
        }
        .save {
          background-color: #6b86c9;
        }

        .btns {
          display: flex;
          flex-direction: row;
          gap: 20px;
        }
        .down-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .down-box span {
          cursor: pointer;
          transition: all 0.25s;
          color: #303030;
        }
        .down-box span:hover {
          color: #324a86;
        }
      `}</style>
    </div>
  );
}
