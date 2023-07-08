import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { RoomsContext } from "../../contexts/RoomsContext";

import { getRooms } from "../Conversations";
import Button from "../Button";

import { useContext } from "react";

import connection from "../../configs/connection";

export default function ModalCreateRoom() {
  const { setRooms } = useContext(RoomsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [roomName, setRoomName] = useState("");
  const [avatar, setAvatar] = useState("");

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  function createRoom() {
    if (roomName.trim() !== "") {
      fetch(`http://localhost:3001/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: roomName,
          avatar: avatar,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          getRooms()
            .then((data) => data.json())
            .then((roomsFetched) => setRooms(roomsFetched.reverse()));
        });
    }

    setRoomName("");
    setAvatar("");

    // Fechar modal
    onClose();
  }

  function handleSubmit() {
    createRoom(); // Chama a função createRoom() para enviar o formulário
  }

  return (
    <>
      <Button onClick={onOpen} classNames="text-[#e94f5c]">
        Criar nova sala
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-white bg-zinc-800 border-b border-[#e94f5c] ">
            Criar Sala
            <ModalCloseButton className="text-zinc-400" />
          </ModalHeader>

          <ModalBody pt={8} pb={6} className="bg-zinc-800">
            {/* Adiciona o onSubmit ao formulário */}
            <FormControl onSubmit={handleSubmit}>
              <FormLabel className="text-zinc-300">Nome da sala</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Nome da sala"
                variant="unstyled"
                pl={4}
                mb={4}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className={"border-2 border-[#393939] p-2"}
                color={"#fff"}
              />
              <FormLabel className="text-zinc-300">Avatar</FormLabel>
              <Input
                placeholder="Avatar"
                pl={4}
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                variant="unstyled"
                className={"border-2 border-[#393939] p-2"}
                color={"#fff"}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter className="bg-zinc-800">
            <Button
              classNames="bg-[#e94f5c] hover:opacity-90 rounded p-2 mr-2"
              type="submit"
              onClick={createRoom}
            >
              Save
            </Button>
            <Button
              classNames="bg-zinc-700 hover:opacity-90 text-white rounded p-2"
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
