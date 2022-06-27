import tmp from "./Img/frog.png";
import { useState, useEffect } from "react";

interface ClubInfo {
  img: string;
  title: string;
  onoff: boolean;
  maxNum: number;
  curNum: number;
  subtitle: string;
  tag: Array<string>;
}

export default function ClubPrev(props: ClubInfo) {
  const { img, title, onoff, maxNum, curNum, subtitle, tag } = props;
  const [onoffTag, setonoff] = useState("");
  const [clubTitle, setTitle] = useState(title);
  const [clubSubtitle, setSubtitle] = useState(subtitle);
  useEffect(() => {
    if (onoff) setonoff(`온라인 모임 | ${curNum}/${maxNum}`);
    else setonoff(`오프라인 모임 | ${curNum}/${maxNum}`);

    if (title.length > 20) setTitle(`${title.substring(0, 20)}...`);

    if (subtitle.length > 60) setSubtitle(`${subtitle.substring(0, 60)}...`);
  }, []);
  return (
    <div>
      <img src={img} alt={title} />
      <div>
        <span>{clubTitle}</span>
        <span>{onoffTag}</span>
        <p>{clubSubtitle}</p>
        <div>
          {tag.map((tag: string) => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
