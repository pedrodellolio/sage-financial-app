export class FetchingDataError extends Error {
  constructor(message = "Ocorreu um erro ao buscar os dados da API.") {
    super(message);
    this.name = "FetchingDataError";
  }
}

export class AuthRequiredError extends Error {
  constructor(message = "Você precisa estar logado para realizar esta ação.") {
    super(message);
    this.name = "AuthRequiredError";
  }
}

export class ProfileRequiredError extends Error {
    constructor(message = "Perfil não selecionado.") {
      super(message);
      this.name = "AuthRequiredError";
    }
  } 
