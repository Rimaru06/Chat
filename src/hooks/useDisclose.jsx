import { useState } from 'react';
const useDisclose = () => {
    const [open, setopen] = useState(false)
    const onOpen = () => {
        setopen(true);
    }
    const onClose = () => {
        setopen(false)
    }
  return {onOpen , onClose , open}
}

export default useDisclose