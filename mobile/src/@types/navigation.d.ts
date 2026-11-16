export type StackParamsList = {
  home: undefined
  "content-details": {
    id: number
  }
  favorites: undefined
}

declare global {
  namespace ReactNavigation {
    type RootParamList = StackParamsList
  }
}
