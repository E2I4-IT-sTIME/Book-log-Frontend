import axios from "axios";
import { ComponentProps, DOMAttributes, useState } from "react";
import FormData from "form-data";

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;

export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function tmp() {
  const listView = () => {
    //모임 받아오기
    axios
      .get("http://15.164.193.190:8080/meetings")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const personalClubView = () => {
    //모임 개별조회
    axios
      .get("http://15.164.193.190:8080/meetings/1")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const enterClub = () => {
    // 모임 입장
    axios
      .get("http://15.164.193.190:8080/auth/meetings/1", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmAnswer = () => {
    //모임 답변 전체 조회
    axios
      .get("http://15.164.193.190:8080/auth/meetings/1/answers", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editClub = () => {
    //모임 수정
    axios
      .patch(
        "http://15.164.193.190:8080/auth/meeting/1",
        {
          name: "난 졸리지 않아...ㅎㅎ",
          info: "반갑습니다\n반갑습니다\n반갑습니다\n반갑습니다\n",
          ment: "어서오고",
          max_num: 10,
          image: "https://pbs.twimg.com/media/D7UyzQCUwAAc_JB.jpg",
          onoff: true,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteClub = () => {
    //모임삭제
    axios
      .delete("http://15.164.193.190:8080/auth/meeting/3", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getoutClub = () => {
    //모임 탈퇴
    axios
      .delete("http://15.164.193.190:8080/auth/meeting/1/out", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewQuestion = () => {
    axios
      .get("http://15.164.193.190:8080/auth/1/question", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const makeAnswer = () => {
    axios
      .post(
        "http://15.164.193.190:8080/auth/1/answer",
        {
          a1: "개졸려",
          a2: "개졸려",
          a3: "개졸려",
          a4: "개졸려",
          a5: "개졸려",
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log("Error!");
      });
  };

  const kickOut = () => {
    // /auth/meeting/{meeting_id}/out/{user_id}
    axios
      .delete("http://15.164.193.190:8080/auth/meeting/1/out/1", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const makeNotice = () => {
    axios
      .patch(
        "http://15.164.193.190:8080/auth/meeting/1/notice",
        {
          notice: "ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅎㅇㅎ~~~~~~~",
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteNotice = () => {
    axios
      .delete("http://15.164.193.190:8080/auth/meeting/1/notice", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const makeComment = () => {
    axios
      .post(
        "http://15.164.193.190:8080/auth/meeting/1/comment",
        {
          content:
            "안녕하세요~~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!!!!!!!!!!!!!!!!!!",
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log("Error!");
      });
  };

  const viewComment = () => {
    axios
      .get("http://15.164.193.190:8080/auth/meeting/1/comment", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = () => {
    axios
      .delete("http://15.164.193.190:8080/auth/meeting/1/comment/2", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const patchComment = () => {
    axios
      .patch(
        "http://15.164.193.190:8080/auth/meeting/1/comment/3",
        {
          content: "호호호호호호호",
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [profile, setProfile] = useState("");
  const [attachment, setAttachment] = useState("");
  const [imgFile, setImgFile] = useState<File>();

  const handleOnChange: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        setProfile(value);
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setAttachment(result);
          setImgFile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const multipartFile = new FormData();
  const imgUpload = () => {
    if (imgFile) {
      multipartFile.append("images", imgFile);
      axios
        .post("http://15.164.193.190:8080/images", multipartFile, {
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  const checkSign = async () => {
    const res = await axios
      .get(`http://15.164.193.190:8080/auth/meeting/1/check`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={() => listView()}>모임받아오기</button>
      <button onClick={() => personalClubView()}>모임개별조회</button>
      <button onClick={() => enterClub()}>모임입장</button>
      <button onClick={() => confirmAnswer()}>모임답변조회</button>
      <button onClick={() => editClub()}>모임수정</button>
      <button onClick={() => deleteClub()}>모임 삭제</button>
      <button onClick={() => getoutClub()}>모임 탈퇴</button>
      <button onClick={() => viewQuestion()}>질문 보기</button>
      <button onClick={() => makeAnswer()}>답변생성</button>
      <button onClick={() => kickOut()}>모임 강퇴</button>
      <button onClick={() => makeNotice()}>공지 생성</button>
      <button onClick={() => deleteNotice()}>공지 삭제</button>
      <button onClick={() => makeComment()}>공지댓글작성</button>
      <button onClick={() => viewComment()}>공지댓글조회</button>
      <button onClick={() => deleteComment()}>공지댓글삭제</button>
      <button onClick={() => patchComment()}>공지댓글수정</button>
      <button onClick={() => checkSign()}>가입여부확인</button>
      <label htmlFor="file">업로드</label>
      <input
        name="file"
        type="file"
        id="file"
        accept="image/*"
        onChange={handleOnChange}
        value={profile}
      />
      <button onClick={() => imgUpload()}>이미지업로드</button>
    </>
  );
}
