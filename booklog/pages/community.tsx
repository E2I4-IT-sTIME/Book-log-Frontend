import BookCommunity from "../components/community/BookCommunity";
import { useState, useEffect } from "react";

export default function community() {
  return (
    <div className="body">
      <BookCommunity />
      <style jsx>{`
        .body {
          background: linear-gradient(to bottom, #324a86 10%, white 40%);
          min-height: 800px;
        }
      `}</style>
    </div>
  ); //독서 커뮤니티
}
