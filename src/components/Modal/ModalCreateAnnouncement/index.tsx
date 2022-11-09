import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { StyledModalPost } from "./styles";
import { AnnouncementContext } from "../../../contexts/AnnouncementContext";
import { UserContext } from "../../../contexts/UserContext";
import { addAnnouncementFormSchema } from "../../../validations/addAnnouncement";

export interface iAddAnnouncement {
  body: string;
  type: string;
  userId: number;
}

const ModalCreateAnnouncement = () => {
  const { userData } = useContext(UserContext);
  const { addAnnouncement, setOpenModalAnnouncement } = useContext(AnnouncementContext);

  const { register, handleSubmit } = useForm<iAddAnnouncement>({
    resolver: yupResolver(addAnnouncementFormSchema),
  });

  const onSubmit: SubmitHandler<iAddAnnouncement> = (data) => {
    const id: number = JSON.parse(localStorage.getItem("@Disclosure:userId")!);

    data["userId"] = id;

    addAnnouncement(data);
    setOpenModalAnnouncement(false);
  };

  return (
    <StyledModalPost>
      <div className="firstDiv">
        <div className="containerDiv">
          <p className="textGreetings">
            Olá {userData?.name}! O que você gostaria de postar?
          </p>
          <p
            className="closeTag"
            onClick={() => setOpenModalAnnouncement(false)}
          >
            X
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Digite a sua publicação...!"
          {...register("body")}
        />
        <div className="divSelect">
          <label>Qual o tipo do seu anuncio?</label>
          <select {...register("type")}>
            <option value="imoveis">Imóveis</option>
            <option value="financas">Finanças</option>
            <option value="auto-pecas">Auto-peças</option>
            <option value="servicos">Serviços</option>
          </select>
        </div>
        <button type="submit">Postar</button>
      </form>
    </StyledModalPost>
  );
};

export default ModalCreateAnnouncement;
