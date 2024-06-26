export interface SessionSuccess {
  id: string
  namespaces: {
    [key: string]: Record<
      string,
      {
        value: string
      }
    >
    public: Record<
      string,
      {
        value: string
      }
    >
  }
}
