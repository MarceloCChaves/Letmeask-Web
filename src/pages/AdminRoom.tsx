import { useHistory, useParams } from "react-router-dom";
import {ToastContainer } from "react-toastify";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";
import "../styles/room.scss";
import deleteImg from '../assets/images/delete.svg'
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomID = params.id;
  const { title, questions } = useRoom(roomID)

  async function handleEndRoom(){
    if(window.confirm("Tem certeza que você deseja excluir essa sala?")){
      database.ref(`rooms/${roomID}`).update({
        endedAt: new Date()
      })
    }
    history.push('/')
  }
  
  async function handleDeleteQuestion(questionId: string){
    if(window.confirm("Tem certeza aue você deseja excluir essa pergunta?")){
      await database.ref(`rooms/${roomID}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <ToastContainer />
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code ={roomID} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main className="main-room-content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>
        <div className="question-list">
          {questions.map( question => {
            return(
              <Question
                content={question.content}
                author={question.author}
                key={question.id}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta"/>
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}
