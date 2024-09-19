import SocialLoginButton from '@/components/molecules/auth/SocialLoginButton';
import { SOCIAL_LOGIN_TYPES } from '@/types';

import AuthWrapper from './AuthWrapper';

function LogInTemplate(): React.ReactNode {
  return (
    <AuthWrapper type="login">
      <div className="mt-8">
        <ul className="space-y-2 font-bold">
          {SOCIAL_LOGIN_TYPES.map((type) => (
            <li key={type}>
              <SocialLoginButton type={type} />
            </li>
          ))}
        </ul>
      </div>
    </AuthWrapper>
  );
}

export default LogInTemplate;
