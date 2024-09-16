import SocialLoginButton from '@/components/molecules/auth/SocialLoginButton';
import { SocialLoginType } from '@/types';

import AuthWrapper from './AuthWrapper';

function LogIn(): React.ReactNode {
  return (
    <AuthWrapper type="login">
      <div className="mt-8">
        <ul className="space-y-2 font-bold">
          {Object.values(SocialLoginType).map((type) => (
            <li key={type}>
              <SocialLoginButton type={type} />
            </li>
          ))}
        </ul>
      </div>
    </AuthWrapper>
  );
}

export default LogIn;
