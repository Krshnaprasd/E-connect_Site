import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypeAnimation = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: [' - Invites You ', '- Lets Connect', ],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 2000,
      loop: true,
      
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return <div className="multiple-text" ref={typedElement} />;
};

export default TypeAnimation;
