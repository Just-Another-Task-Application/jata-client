import { useCallback, useEffect, useState, } from 'react';

type Title = {
  currentTitle: string | null;
  setTitle: (value: string) => any;
}

export const useTitle: (value?: string) => Title = (value) => {
  const [ currentTitle, setCurrentTitle, ] = useState<string | null>(null);

  const handleChangeTitle = useCallback((title: string) => {
    document.title = title;
    setCurrentTitle(title);
  }, [setCurrentTitle,]);

  useEffect(() => {
    if (!currentTitle)
      setCurrentTitle(document.title);

    handleChangeTitle(value ?? document.title);
  }, [handleChangeTitle]);

  return {
    currentTitle,
    setTitle: handleChangeTitle,
  };
};