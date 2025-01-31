import React, { FC, useEffect, useRef } from 'react';
import { useToast, ToastProps } from '@chakra-ui/react';

const Toast: FC<ToastProps> = ({ status, title, description }) => {
  const toast = useToast();
  const lastToastMessage = useRef<string | null>(null);

  useEffect(() => {
    const newMessage = `${status}-${title}-${description}`;

    if (lastToastMessage.current !== newMessage) {
      toast({
        title,
        description,
        status,
        duration: 6000,
        isClosable: true,
        position: 'top',
      });
      lastToastMessage.current = newMessage;
    }
  }, [status, title, description, toast]);

  return null;
};

export default Toast;
