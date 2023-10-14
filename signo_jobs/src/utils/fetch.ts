export function fetchApi(
  route: string,
  options?: {
    method?: string;
    headers?: {
      authorization?: string;
    };
    [chave: string]: any;
  }
) {
  return fetch(`http://localhost:3000${route}`, options)
    .then((res) => res.json())
    .catch((error) => console.log("Api Error:", error));
}
