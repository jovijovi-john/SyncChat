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
import { useRef } from "react";
import Button from "../Button";

export default function ModalCreateRoom() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
            <FormControl>
              <FormLabel className="text-zinc-300">Nome da sala</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Nome da sala"
                variant="unstyled"
                pl={4}
                className={"border-2 border-[#393939] p-2"}
                color={"#fff"}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter className="bg-zinc-800">
            <Button classNames="bg-[#e94f5c] hover:opacity-90 rounded p-2 mr-2">
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
