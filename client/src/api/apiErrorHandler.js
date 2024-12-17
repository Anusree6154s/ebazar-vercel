export const handleError = (error, data) => {
    // response error
    if (error instanceof Response) {
      return {
        code: error.status,
        message: data.message,
      };
    }
  
    // network error
    return {
      code: "NETWORK_ERROR",
      message: error.message || "A network error occurred.",
    };
  };
  