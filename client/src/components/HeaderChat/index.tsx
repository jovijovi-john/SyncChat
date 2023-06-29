import { Avatar, AvatarBadge, Stack } from "@chakra-ui/react";

import "./styles.css";

export function HeaderChat() {
  return (
    <div className="headerRoom sticky z-20 w-full self-start flex flex-1  py-2">
      <Stack direction="row" className="px-4 hover:cursor-pointer" spacing={4}>
        <Avatar src={"https://github.com/joodavi.png"} size={"md"} />
      </Stack>

      <div className="flex flex-col">
        <span className="font-bold text-zinc-200">
          SEXOOOOOOOOOO DE CAVALOS
        </span>
        <small className="text-zinc-400">
          João Davi, André broxa, Pv Safado, Gabriel_Transa
        </small>
      </div>
    </div>
  );
}
