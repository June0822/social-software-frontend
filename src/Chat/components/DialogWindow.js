import styled from "styled-components"

import ChatInput from "./ChatInput"

const Window = styled.div`
    border: solid 1px LightGray;
    text-align: center;
    height: 100vh;
`

export default function DialogWindow () {
    return(
        <Window>
            <ChatInput />
        </Window>
    )
}