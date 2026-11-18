type BottomParamsList = {
  home: undefined
  favorites: undefined
}

export type StackParamsList = {
  main: BottomParamsList
  "content-details": {
    id: number
  }
}

declare global {
  namespace ReactNavigation {
    type RootParamList = StackParamsList & BottomParamsList
  }
}
