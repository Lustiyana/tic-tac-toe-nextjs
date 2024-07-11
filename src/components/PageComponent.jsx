"use client";
import IconsShow from "@/components/IconsShow";
import { useEffect, useState } from "react";
import MessageComponent from "./MessageComponent";

export default function PageComponent({ dataImages }) {
  const initialArray = ["", "", "", "", "", "", "", "", ""];
  const initialAnswer = {
    answer: "",
    player: "",
  };
  const initialOpenModal = {
    status: false,
    message: "",
  };
  const [array, setArray] = useState(initialArray);
  const [selectGiliran, setSelectGiliran] = useState("");
  const [pointX, setPointX] = useState(0);
  const [pointO, setPointO] = useState(0);
  const [answer, setAnswer] = useState(initialAnswer);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [openModal, setOpenModal] = useState(initialOpenModal);
  const [finish, setFinish] = useState(false);
  const [winner, setWinner] = useState("");

  const handleClickBoard = (index) => {
    if (canPlay) {
      const newArray = [...array];
      newArray[index] = selectGiliran;
      setArray(newArray);
      setCanPlay(false);
    } else {
      setOpenModal({
        status: true,
        success: false,
        message: "OW.... Sorry kamu belum punya kesempatan, isi dulu ya",
      });
    }
  };

  useEffect(() => {
    const checkWinner = (arr, player) => {
      return (
        (arr[0] === player && arr[1] === player && arr[2] === player) ||
        (arr[3] === player && arr[4] === player && arr[5] === player) ||
        (arr[6] === player && arr[7] === player && arr[8] === player) ||
        (arr[0] === player && arr[3] === player && arr[6] === player) ||
        (arr[1] === player && arr[4] === player && arr[7] === player) ||
        (arr[2] === player && arr[5] === player && arr[8] === player) ||
        (arr[0] === player && arr[4] === player && arr[8] === player) ||
        (arr[2] === player && arr[4] === player && arr[6] === player)
      );
    };

    if (checkWinner(array, "X")) {
      setPointX((prev) => prev + 1);
      setTimeout(() => {
        setArray(initialArray);
      }, 2000);
    } else if (checkWinner(array, "O")) {
      setPointO((prev) => prev + 1);
      setTimeout(() => {
        setArray(initialArray);
      }, 2000);
    }
  }, [array]);

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (dataImages[indexQuestion].answer == answer.answer.toUpperCase()) {
      setSelectGiliran(answer.player);
      setCanPlay(true);
      setIndexQuestion((prev) => prev + 1);
      setOpenModal({
        status: true,
        success: true,
        message: "Hore!!!!! Jawaban kamu bener, silahkan isi board",
      });
    } else {
      setOpenModal({
        status: true,
        success: false,
        message: "Yahhh Jawaban kamu salah, coba lagi nanti ya",
      });
    }
    setAnswer(initialAnswer);
  };

  const handleChangeAnswer = (player, answer) => {
    setAnswer({
      answer,
      player,
    });
  };

  useEffect(() => {
    if (openModal.status) {
      const timeout = setTimeout(() => {
        setOpenModal((prevState) => ({
          ...prevState,
          status: false,
        }));
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [openModal.status]);

  const handleReturn = () => {
    setIndexQuestion(0);
  };

  useEffect(() => {
    if (indexQuestion === dataImages.length) {
      const timeout = setTimeout(() => {
        setFinish(true);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [indexQuestion, dataImages.length]);

  useEffect(() => {
    if (pointO > pointX) {
      setWinner("O");
    } else if (pointX > pointO) {
      setWinner("X");
    }
  }, [pointO, pointX]);


  return (
    <>
      {finish && !canPlay ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-7xl text-pink-700">
            {winner == ""
              ? "Hasilnya Seri"
              : `Pemenangnya adalah tim ${winner}`}
          </h1>
          <button className="btn btn-primary mt-8" onClick={handleReturn}>
            MULAI MAIN
          </button>
        </div>
      ) : (
        <>
          {openModal?.status ? (
            <MessageComponent
              message={openModal.message}
              success={openModal.success}
            />
          ) : null}
          <h1 className="text-center my-12 font-bold text-3xl text-pink-600">
            Tic Tac Toe Tebak Lagu
          </h1>
          <div className="grid grid-cols-2">
            <div className="border-r-2 flex flex-col items-center justify-center gap-4">
              {canPlay ? (
                <img src="/censored.png" alt="" className="w-72" />
              ) : (
                <img
                  src={dataImages[indexQuestion]?.image}
                  className="w-72"
                ></img>
              )}
              <form
                className="flex flex-col gap-4 px-8"
                onSubmit={handleSubmitAnswer}
              >
                <label className="input input-bordered flex items-center gap-2">
                  Jawaban X
                  <input
                    type="text"
                    className="grow"
                    placeholder="Ketik jawaban disini"
                    onChange={(e) => handleChangeAnswer("X", e.target.value)}
                    value={answer.player == "X" ? answer.answer : ""}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Jawaban O
                  <input
                    type="text"
                    className="grow"
                    placeholder="Ketik jawaban disini"
                    onChange={(e) => handleChangeAnswer("O", e.target.value)}
                    value={answer.player == "O" ? answer.answer : ""}
                  />
                </label>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={canPlay}
                >
                  SUBMIT
                </button>
              </form>
            </div>
            <div className="flex flex-col items-center gap-8 justify-center">
              <div className="flex justify-center w-1/2">
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan={2} className="text-center text-lg">
                        Score
                      </th>
                    </tr>
                    <tr className="text-lg text-center">
                      <th>X</th>
                      <th>O</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">{pointX} point</td>
                      <td className="text-center">{pointO} point</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="grid grid-cols-3 text-center">
                  {array.map((item, index) => (
                    <button
                      className="w-28 h-28 flex items-center justify-center border-2 border-black btn"
                      onClick={() => handleClickBoard(index)}
                      key={index}
                    >
                      <IconsShow player={item} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
