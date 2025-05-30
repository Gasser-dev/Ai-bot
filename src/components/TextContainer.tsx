import { useEffect } from 'react'
import { TextShimmer } from './ui/text-shimmer'
import gsap from 'gsap';

function TextContainer() {
    useEffect(() => {
        gsap.fromTo("#textDiv", {
          y:-70,
          opacity: 0.5,
        }, {
          y: 0,
          opacity: 1,
          duration: 1.5,
        });
      }, []); 
  return (
    <div className='justify-center pt-11'>
        <div id='textDiv' className='flex justify-center'>
    <TextShimmer>Hi, How are you</TextShimmer>
        </div>
    </div>
  )
}

export default TextContainer