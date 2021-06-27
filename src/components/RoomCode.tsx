import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";
import { toast, ToastContainer } from "react-toastify";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.info("Código copiado para a área de transferência");
  }
  return (
    <div className="main-content-roomCode">
      <ToastContainer />
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
    </div>
  );
}
