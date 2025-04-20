import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({children}) => {

   
    const [inputValue, setInputValue] = useState("");
    const [inChat, setInChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    

    return (
        <Context.Provider 
            value={{
                inputValue,
                setInputValue,
                inChat,
                setInChat,
                messages,
                setMessages,
                isLoading,
                setIsLoading
            }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;