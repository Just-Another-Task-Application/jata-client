import {
  FC,
  ComponentPropsWithRef
} from 'react';
import { useRecoilValue, } from 'recoil';

import { signupState, } from '../../state/atoms';

type PreviewProps = object & ComponentPropsWithRef<'article'>;

const Preview: FC<PreviewProps> = (props) => {
  const signupPayload = useRecoilValue(signupState);

  return (
    <article
      {...props}
      className='absolute right-0 top-2/4 translate-y-2/4'>
      <span className='text-white'>Hola mundo</span>
    </article>
  );
}

export default Preview;