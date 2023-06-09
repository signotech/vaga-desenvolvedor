export interface iDefaultProviderProps {
   children: React.ReactNode;
}


export interface iDashboardPageContext {
   selectList: string
   setSelectList: React.Dispatch<React.SetStateAction<string>>
   opemModalInfo: boolean
   setOpemModaInfo: React.Dispatch<React.SetStateAction<boolean>>
}
