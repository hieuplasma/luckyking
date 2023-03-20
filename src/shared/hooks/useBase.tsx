import {useState} from 'react';
export const useBase = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const onHandleError = (error?: any) => {
    setErrorMessage(error);
    return Promise.reject(error);
  };
  return {
    errorMessage,
    isLoading,
    setErrorMessage,
    setLoading,
    onHandleError,
  };
};
