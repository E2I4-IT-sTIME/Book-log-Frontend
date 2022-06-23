import BookCommunity from "../components/BookCommunity";
import { useState, useEffect } from "react";

export default function community() {
  return (
    <div className="body">
      <BookCommunity />
      <style jsx>{`
        .body {
          background: linear-gradient(to bottom, #324a86 5%, white 95%);
          height: 100%;
        }
      `}</style>
    </div>
  ); //독서 커뮤니티
}
